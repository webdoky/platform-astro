import extractMacrosFromText from './extract-macros-from-text.js';

describe('extractMacrosFromText', () => {
  test('works for text without macros', () => {
    const input = 'Some text without macros';

    const output = extractMacrosFromText(input);

    expect(output).toEqual([
      {
        type: 'text',
        value: 'Some text without macros',
      },
    ]);
  });

  test('works for a macros with no params', () => {
    const input = 'Some text with a {{macro}}';

    const output = extractMacrosFromText(input);

    expect(output).toEqual([
      {
        type: 'text',
        value: 'Some text with a ',
      },
      {
        name: 'macro',
        parameters: [],
        type: 'macro',
      },
    ]);
  });

  test('works for a macros with one param', () => {
    const input = 'Some text with a {{macro("param")}}';

    const output = extractMacrosFromText(input);

    expect(output).toEqual([
      {
        type: 'text',
        value: 'Some text with a ',
      },
      {
        name: 'macro',
        parameters: ['"param"'],
        type: 'macro',
      },
    ]);
  });

  test('works for multimacros text', () => {
    const input = `Чимало комп'ютерних систем замість ASCII використовують {{glossary("Unicode")}}, який має мільйони кодових точок, але перші 128 з них є такими ж, як набір ASCII. {{Glossary("UTF-8")}} замінив ASCII у Вебі у 2007 році.`;

    const output = extractMacrosFromText(input);
    console.log(output);

    expect(output).toEqual([
      {
        type: 'text',
        value: "Чимало комп'ютерних систем замість ASCII використовують ",
      },
      { name: 'glossary', parameters: ['"Unicode"'], type: 'macro' },
      {
        type: 'text',
        value:
          ', який має мільйони кодових точок, але перші 128 з них є такими ж, як набір ASCII. ',
      },
      { name: 'Glossary', parameters: ['"UTF-8"'], type: 'macro' },
      {
        type: 'text',
        value: ' замінив ASCII у Вебі у 2007 році.',
      },
    ]);
  });
});
