import { useEffect, useMemo } from 'react';
import { CreateStyleSheetType, StyledStyleSheet, CSSProperties } from './types';

const processCSSProperties = (styles: CSSProperties): string => {
  return Object.keys(styles)
    .map((prop) => {
      if (prop.startsWith('&')) {
        const pseudoClass = prop.substring(1); // Extract the pseudo-class name
        const pseudoClassStyles = processCSSProperties(
          styles[prop] as CSSProperties,
        );
        return `&${pseudoClass} { ${pseudoClassStyles} }`;
      } else if (typeof styles[prop as keyof CSSProperties] === 'object') {
        const nestedStyles = processCSSProperties(
          styles[prop as keyof CSSProperties] as CSSProperties,
        );
        return `${prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)} { ${nestedStyles} }`;
      } else {
        const cssProp = prop.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
        return `${cssProp}: ${styles[prop as keyof CSSProperties]};`;
      }
    })
    .join(' ');
};

export const useStyleSheet = (
  userStyles: CreateStyleSheetType,
  props: { [key: string]: any } | null,
): { [key: string]: string } => {
  const [prefix, stylesOrFunc] = userStyles;

  const styleSheet: StyledStyleSheet = {
    ...(typeof stylesOrFunc === 'function'
      ? stylesOrFunc(props || {})
      : stylesOrFunc),
    __prefix__: prefix,
  } as StyledStyleSheet;

  const classNames = useMemo(() => {
    const classMap: { [key: string]: string } = {};
    const prefix = styleSheet.__prefix__ || ''; // Get the prefix from the stylesheet
    for (const key in styleSheet) {
      if (
        key !== '__prefix__' &&
        Object.prototype.hasOwnProperty.call(styleSheet, key)
      ) {
        // if (key !== '__prefix__' && styleSheet.hasOwnProperty(key)) {
        classMap[key] = `${prefix}-${key}`; // Use the prefix and key to form class names
      }
    }
    return classMap;
  }, [styleSheet]);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';

    const styles = Object.keys(styleSheet)
      .map((key) => {
        if (key !== '__prefix__') {
          const style = styleSheet[key];
          const className = classNames[key];
          const cssString = processCSSProperties(style);
          return `.${className} { ${cssString} }`;
        }
        return '';
      })
      .join(' ');

    styleElement.appendChild(document.createTextNode(styles));
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [styleSheet, classNames, props, prefix]);

  return classNames;
};
