import { useMemo } from 'react';

// Utility: camelCase to kebab-case
function camelToKebab(str: string) {
  return str.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
}

// Utility: simple hash for className uniqueness
function hash(str: string): string {
  let h = 0,
    i,
    chr;
  if (str.length === 0) return '0';
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    h = (h << 5) - h + chr;
    h |= 0;
  }
  return Math.abs(h).toString(36);
}

// Converts a flat style object to CSS string
function styleObjToCssInner(styleObj: any): string {
  return Object.entries(styleObj)
    .filter(([_, v]) => typeof v !== 'object')
    .map(([k, v]) => `${camelToKebab(k)}:${v};`)
    .join('');
}

// Converts a style object to CSS string (handles pseudo-selectors)
function styleObjToCss(className: string, styleObj: any): string {
  let css = '';
  const base: Record<string, any> = {};
  for (const key in styleObj) {
    if (!Object.prototype.hasOwnProperty.call(styleObj, key)) continue;
    const value = styleObj[key];
    if (typeof value === 'object' && key.startsWith('&')) {
      css += `.${className}${key.slice(1)}{${styleObjToCssInner(value)}}`;
    } else if (typeof value !== 'object') {
      base[key] = value;
    }
  }
  if (Object.keys(base).length > 0) {
    css = `.${className}{${styleObjToCssInner(base)}}` + css;
  }
  return css;
}

// Registry to avoid duplicate style injection
const styleSheetRegistry = new Set<string>();

// Injects CSS into the document head
function injectCss(css: string) {
  if (typeof window === 'undefined' || styleSheetRegistry.has(css)) return;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  styleSheetRegistry.add(css);
}

// Type-safe stylesheet definition
type StyleSheet<Props> = {
  name: string;
  getStyles: (props: Props) => Record<string, any>;
};

export function createStyleSheet<Props>(
  name: string,
  getStyles: (props: Props) => Record<string, any>,
): StyleSheet<Props> {
  return { name, getStyles };
}

export function useStyleSheet<Props>(
  styleSheet: StyleSheet<Props>,
  props: Props,
): Record<string, string> {
  return useMemo(() => {
    const styleObj = styleSheet.getStyles(props);
    const classes: Record<string, string> = {};
    Object.keys(styleObj).forEach((key) => {
      const className = `${styleSheet.name}-${key}-${hash(JSON.stringify(styleObj[key]))}`;
      classes[key] = className;
      const css = styleObjToCss(className, styleObj[key]);
      if (!styleSheetRegistry.has(css)) {
        injectCss(css);
      }
    });
    return classes;
  }, [styleSheet, props]);
}
