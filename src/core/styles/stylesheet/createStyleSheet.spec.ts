// src/core/styles/stylesheet.spec.ts
import { createStyleSheet } from "./createStyleSheet";
import { StyleSheet } from "./types";

describe("createStyleSheet", () => {
  test("returns a tuple with the prefix and style object", () => {
    const styles: StyleSheet = {
      container: {
        display: "flex",
        flexDirection: "column",
        color: "black",
      },
    };
    const result = createStyleSheet("testPrefix", styles);

    expect(result).toEqual(["testPrefix", styles]);
  });

  test("returns a tuple with the prefix and a function", () => {
    const stylesFunc = (props: { isRed: boolean }): StyleSheet => ({
      container: {
        display: "flex",
        flexDirection: "column",
        color: props.isRed ? "red" : "black",
      },
    });
    const result = createStyleSheet("testPrefix", stylesFunc);

    expect(result).toEqual(["testPrefix", stylesFunc]);
  });
});
