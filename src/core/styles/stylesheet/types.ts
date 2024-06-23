// Type definition for the stylesheet
export type StyleSheet = {
  [key: string]: React.CSSProperties;
};

// Type definition for the styled stylesheet which includes __prefix__
export type StyledStyleSheet = StyleSheet & {
  __prefix__?: string;
};

export type CreateStyleSheetType = [prefix: string, stylesOrFunc: StyleSheet | ((props: any) => StyleSheet)];