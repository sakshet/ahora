import { useMemo } from 'react';

// Utility: camelCase to kebab-case
function camelToKebab(str: string) {
  return str.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase());
}
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
function styleObjToCssInner(styleObj: any): string {
  return Object.entries(styleObj)
    .filter(([_, v]) => typeof v !== 'object')
    .map(([k, v]) => `${camelToKebab(k)}:${v};`)
    .join('');
}
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
const styleSheetRegistry = new Set<string>();

function injectCss(css: string) {
  if (typeof window === 'undefined' || styleSheetRegistry.has(css)) return;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
  styleSheetRegistry.add(css);
}

// --- Typed API ---

type StyleObject = Record<string, any>;

// Overload for static styles
export function createStyleSheet<Styles extends StyleObject>(
  name: string,
  getStyles: () => Styles,
): {
  name: string;
  getStyles: () => Styles;
  styleKeys: (keyof Styles)[];
};

// Overload for dynamic styles
export function createStyleSheet<Props, Styles extends StyleObject>(
  name: string,
  getStyles: (props: Props) => Styles,
): {
  name: string;
  getStyles: (props: Props) => Styles;
  styleKeys: (keyof Styles)[];
};

// Implementation
export function createStyleSheet(name: string, getStyles: any) {
  // We can't get keys at runtime, but TS will infer them at compile time
  return { name, getStyles, styleKeys: [] };
}

// Overload for static styles
export function useStyleSheet<Styles extends StyleObject>(styleSheet: {
  name: string;
  getStyles: () => Styles;
  styleKeys: (keyof Styles)[];
}): { [K in keyof Styles]: string };

// Overload for dynamic styles
export function useStyleSheet<Props, Styles extends StyleObject>(
  styleSheet: {
    name: string;
    getStyles: (props: Props) => Styles;
    styleKeys: (keyof Styles)[];
  },
  props: Props,
): { [K in keyof Styles]: string };

// Implementation
export function useStyleSheet(styleSheet: any, props?: any) {
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
