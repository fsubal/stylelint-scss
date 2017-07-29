import { parseNestedPropRoot } from "../";

// --------------------------------------------------------------------------
// nested props
// --------------------------------------------------------------------------

test("`background:`", () => {
  expect.assertions(1);

  const result = parseNestedPropRoot("background:");

  expect(result).toEqual({
    propName: {
      value: "background",
      after: ""
    }
  });
});

test("`background: red`", () => {
  expect.assertions(1);

  const result = parseNestedPropRoot("background: red");

  expect(result).toEqual({
    propName: {
      value: "background",
      after: ""
    },
    propValue: {
      value: "red",
      before: " ",
      sourceIndex: 12
    }
  });
});

test("`margin:10px`", () => {
  expect.assertions(1);

  const result = parseNestedPropRoot("margin:10px");

  expect(result).toEqual({
    propName: {
      value: "margin",
      after: ""
    },
    propValue: {
      value: "10px",
      before: "",
      sourceIndex: 7
    }
  });
});

test("`margin:$var`", () => {
  expect.assertions(1);

  const result = parseNestedPropRoot("margin:$var");

  expect(result).toEqual({
    propName: {
      value: "margin",
      after: ""
    },
    propValue: {
      value: "$var",
      before: "",
      sourceIndex: 7
    }
  });
});

test("`input: -moz-focusring ` -- yes, this IS parsed as 'prop: value' by Sass!", () => {
  expect.assertions(1);

  const result = parseNestedPropRoot("input: -moz-focusring");

  expect(result).toEqual({
    propName: {
      value: "input",
      after: ""
    },
    propValue: {
      value: "-moz-focusring",
      before: " ",
      sourceIndex: 7
    }
  });
});

test("`background  :  red`", () => {
  expect.assertions(1);

  const result = parseNestedPropRoot("background  :  red");

  expect(result).toEqual({
    propName: {
      value: "background",
      after: "  "
    },
    propValue: {
      value: "red",
      before: "  ",
      sourceIndex: 15
    }
  });
});

test("Edge case: function with param `#{fn($a:1)}:`.", () => {
  expect.assertions(1);

  const result = parseNestedPropRoot("#{fn($a:1)}:");

  expect(result).toEqual({
    propName: {
      value: "#{fn($a:1)}",
      after: ""
    }
  });
});

test("Edge case: function with param `#{fn($a: 1)}:`.", () => {
  expect.assertions(1);

  const result = parseNestedPropRoot("#{fn($a: 1)}:");

  expect(result).toEqual({
    propName: {
      value: "#{fn($a: 1)}",
      after: ""
    }
  });
});

test('`input:"prop: value"` (value is a string).', () => {
  expect.assertions(1);

  const result = parseNestedPropRoot('input:"prop: value"');

  expect(result).toEqual({
    propName: {
      value: "input",
      after: ""
    },
    propValue: {
      value: '"prop: value"',
      before: "",
      sourceIndex: 6
    }
  });
});

// --------------------------------------------------------------------------
// selectors
// --------------------------------------------------------------------------

test("`background:red` (compiles to a selector by Sass)", () => {
  expect.assertions(1);

  const result = parseNestedPropRoot("background:red");

  expect(result).toBe(null);
});

test("`background :red` (compiles to a selector by Sass)", () => {
  expect.assertions(1);

  const result = parseNestedPropRoot("background :red");

  expect(result).toBe(null);
});

test("`&:a1px` (trying to invoke false positive for a number as a value)", () => {
  expect.assertions(1);

  const result = parseNestedPropRoot("&:a1px");

  expect(result).toBe(null);
});

test("`input:-moz-focusring `", () => {
  expect.assertions(1);

  const result = parseNestedPropRoot("input:-moz-focusring");

  expect(result).toEqual(null);
});

test("`&:not(.other-class) `", () => {
  expect.assertions(1);

  const result = parseNestedPropRoot("&:not(.other-class)");

  expect(result).toEqual(null);
});

test("`&:pseudo`", () => {
  expect.assertions(1);

  const result = parseNestedPropRoot("&:pseudo");

  expect(result).toEqual(null);
});

// --------------------------------------------------------------------------
// other something
// --------------------------------------------------------------------------

test('`"input: prop"` (a "-string)', () => {
  expect.assertions(1);

  const result = parseNestedPropRoot('"input: prop"');

  expect(result).toEqual(null);
});

test("`'input: prop'` (a '-string)", () => {
  expect.assertions(1);

  const result = parseNestedPropRoot("'input: prop'");

  expect(result).toEqual(null);
});