import { CSSProperties as ReactCSSProperties } from "react";

// Extend the existing React.CSSProperties type to include pseudo-class styles
export type CSSProperties = ReactCSSProperties & {
  [key: string]: ReactCSSProperties | string | undefined; // Allow string values for pseudo-classes like '&:hover'
};

// Type definition for the stylesheet
export type StyleSheet = {
  [key: string]: CSSProperties;
};

// Type definition for the styled stylesheet which includes __prefix__
export type StyledStyleSheet = StyleSheet & {
  __prefix__?: string;
};

export type CreateStyleSheetType = [
  prefix: string,
  stylesOrFunc: StyleSheet | ((props: any) => StyleSheet),
];
