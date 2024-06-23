import { CreateStyleSheetType, StyleSheet, CSSProperties } from "./types";

export const createStyleSheet = (
  prefix: string,
  stylesOrFunc: StyleSheet | ((props: any) => StyleSheet),
): CreateStyleSheetType => {
  // Check if stylesOrFunc is a function or a plain object
  const styleSheet =
    typeof stylesOrFunc === "function" ? stylesOrFunc({}) : stylesOrFunc;

  // Process pseudo-class styles if they exist
  const processedStyleSheet: StyleSheet = {};
  for (const key in styleSheet) {
    if (Object.prototype.hasOwnProperty.call(styleSheet, key)) {
      const style = styleSheet[key];
      if (
        typeof style === "object" &&
        Object.keys(style).some((prop) => prop.startsWith("&:"))
      ) {
        const baseStyle: CSSProperties = { ...style } as CSSProperties;
        const pseudoClassStyles: { [key: string]: CSSProperties } = {};
        for (const pseudoKey in baseStyle) {
          if (Object.prototype.hasOwnProperty.call(baseStyle, pseudoKey)) {
            if (pseudoKey.startsWith("&:")) {
              const pseudoStyle = baseStyle[pseudoKey];
              pseudoClassStyles[pseudoKey] = pseudoStyle as CSSProperties; // Assert pseudoStyle as CSSProperties
              delete baseStyle[pseudoKey];
            }
          }
        }
        processedStyleSheet[key] = baseStyle;
        if (Object.keys(pseudoClassStyles).length > 0) {
          processedStyleSheet[key]["&"] = pseudoClassStyles;
        }
      } else {
        processedStyleSheet[key] = style as CSSProperties;
      }
    }
  }

  return [prefix, processedStyleSheet];
};
