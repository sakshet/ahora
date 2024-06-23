import { CreateStyleSheetType, StyleSheet } from './types';

export const createStyleSheet = (
  prefix: string,
  stylesOrFunc: StyleSheet | ((props: any) => StyleSheet),
): CreateStyleSheetType => {
  return [prefix, stylesOrFunc];
};