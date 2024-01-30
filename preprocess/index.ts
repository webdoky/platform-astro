import { mkdirSync, readdirSync, statSync } from "fs";
import { join, resolve } from "path";

import { config as dotenvConfig } from "dotenv";

import processFile from "./process-file.js";
import adjustOutputFolder from "./adjust-output-folder.js";

dotenvConfig();

const { PATH_TO_LOCALIZED_CONTENT } = process.env;

const OUTPUT_FOLDER = "src/content/translatedContent";

// walk through all the Markdown files in the localized content directory
function walk(dir: string, callback: (path: string) => void) {
  readdirSync(dir).forEach((f: string) => {
    const dirPath = join(dir, f);
    const isDirectory = statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(join(dir, f));
  });
}
if (!PATH_TO_LOCALIZED_CONTENT) {
  throw new Error("PATH_TO_LOCALIZED_CONTENT is not defined");
}
walk(join(PATH_TO_LOCALIZED_CONTENT, "files"), (filePath: string) => {
  if (filePath.endsWith(".md")) {
    console.log(filePath);
    const folder = filePath.split("/").slice(0, -1).join("/");
    const outputPath = adjustOutputFolder(filePath.replace(
      join(PATH_TO_LOCALIZED_CONTENT, "files"),
      resolve(OUTPUT_FOLDER)
    ));
    if (outputPath === filePath) {
        throw new Error("outputPath is the same as filePath");
    }
    mkdirSync(
      resolve(
        adjustOutputFolder(folder.replace(
          join(PATH_TO_LOCALIZED_CONTENT, "files"),
          resolve(OUTPUT_FOLDER)
        ))
      ),
      { recursive: true }
    );
    processFile(filePath, outputPath);
  }
});
