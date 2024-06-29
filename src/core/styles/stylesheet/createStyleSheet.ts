import { StyleSheet, CreateStyleSheetType, CSSProperties } from './types';

export const createStyleSheet = (
  prefix: string,
  stylesOrFunc: StyleSheet | ((props: any) => StyleSheet),
): CreateStyleSheetType => {
  return [prefix, stylesOrFunc];
};
