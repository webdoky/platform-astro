import { readFileSync, writeFileSync } from "fs";

import type { Literal } from "mdast";
import remarkFrontmatter from "remark-frontmatter";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";

import escapeForHtml from "./escape-for-html.js";
import escapeForHtmlDataAttribute from "./escape-for-html-data-attribute.js";
import getIndicesOf from "./get-indices-of.js";
import type {
  AbstractParentNode,
  BrokenMacroNode,
  CustomNode,
  MacroNode,
} from "./types.js";

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkStringify);

export default function processFile(filePath: string, outFilePath: string) {
  // Read file contents
  const fileContents = readFileSync(filePath, "utf8");
  // Parse file contents
  const parsedFile = processor.parse(fileContents);

  visit<CustomNode, (node: CustomNode) => boolean>(
    parsedFile,
    (node: CustomNode) => {
      if (node.type === "text") {
        return (node as Literal).value.includes("{{");
      }
      return false;
    },
    (node, index, parent) => {
      //   console.log("parse", node);
      const nodeLiteral = node as Literal;
      const macrosStartIndexes: number[] = getIndicesOf(
        "{{",
        nodeLiteral.value
      );
      const macrosEndIndexes: number[] = getIndicesOf("}}", nodeLiteral.value);
      if (macrosStartIndexes.length !== macrosEndIndexes.length) {
        console.error("Unbalanced number of {{ and }}");
        return;
      }
      const replacementNodes: (Literal | MacroNode | BrokenMacroNode)[] = [];
      for (let i = 0; i < macrosStartIndexes.length; i++) {
        const beforeMacro = nodeLiteral.value.substring(
          i > 0 && macrosEndIndexes.length > 0
            ? macrosEndIndexes[i - 1] + 2
            : 0,
          macrosStartIndexes[i]
        );
        if (beforeMacro.length > 0) {
          replacementNodes.push({
            type: "text",
            value: beforeMacro,
          });
        }
        const macro = nodeLiteral.value
          .substring(macrosStartIndexes[i] + "{{".length, macrosEndIndexes[i])
          .trim();
        console.log('macro', macro);
        if (!macro) {
          throw new Error("Macro is empty");
        }
        const parenthesisOpenIndex = macro.indexOf("(");
        const parenthesisCloseIndex = macro.indexOf(")", parenthesisOpenIndex);
        if ((parenthesisOpenIndex === -1) !== (parenthesisCloseIndex === -1)) {
          console.log(nodeLiteral.value);
          replacementNodes.push({
            type: "brokenMacro",
            code: macro,
            error: "Unbalanced number of parenthesis",
          });
          continue;
        }
        if (parenthesisOpenIndex === -1) {
          replacementNodes.push({
            type: "macro",
            name: macro,
            parameters: [],
          });
        }
        const macroName = macro.substring(0, parenthesisOpenIndex);
        const macroParameters = macro
          .substring(parenthesisOpenIndex + "(".length, parenthesisCloseIndex)
          .split(",")
          .map((parameter) => parameter.trim());
        replacementNodes.push({
          type: "macro",
          name: macroName,
          parameters: macroParameters,
        });
      }
      const afterAllMacros = nodeLiteral.value.substring(
        macrosEndIndexes[macrosEndIndexes.length - 1] + "}}".length
      );
      if (afterAllMacros.length > 0) {
        replacementNodes.push({
          type: "text",
          value: afterAllMacros,
        });
      }
      // Replace current node at `index` with `replacementNodes`
      if (!parent || !parent.children) {
        throw new Error("Parent or parent's children are undefined");
      }
      if (index === undefined) {
        throw new Error("Index is undefined");
      }
      parent.children.splice(index, 1, ...replacementNodes);
    }
  );

  visit(
    parsedFile,
    "macro",
    (node: MacroNode, index, parent: AbstractParentNode) => {
      //   console.log("macro", node);
      if (!parent || !parent.children) {
        throw new Error("Parent or parent's children are undefined");
      }
      if (index === undefined) {
        throw new Error("Index is undefined");
      }
      const replacementNode = {
        type: "html",
        value: `<span class="macro" data-macro-name="${
          node.name
        }" data-parameters="${escapeForHtmlDataAttribute(
          JSON.stringify(node.parameters)
        )}">{{${escapeForHtml(node.name)}${
          node.parameters.length
            ? `(${escapeForHtml(node.parameters.join(", "))})`
            : ""
        }}}</span>`,
      };
      parent.children.splice(index, 1, replacementNode);
    }
  );
  visit(
    parsedFile,
    "brokenMacro",
    (node: BrokenMacroNode, index, parent: AbstractParentNode) => {
      //   console.log("brokenMacro", node);
      if (!parent || !parent.children) {
        throw new Error("Parent or parent's children are undefined");
      }
      if (index === undefined) {
        throw new Error("Index is undefined");
      }
      const replacementNode = {
        type: "html",
        value: `<span class="brokenMacro" data-error="${escapeForHtmlDataAttribute(
          node.error
        )}">{{${escapeForHtml(node.code)}}}</span>`,
      };
      parent.children.splice(index, 1, replacementNode);
    }
  );
  const output = processor.stringify(parsedFile);

  writeFileSync(outFilePath, output);
}
