import React, { useEffect, useMemo } from 'react';

// Type definition for the stylesheet
type StyleSheet = {
  [key: string]: React.CSSProperties;
};

// Type definition for the styled stylesheet which includes __prefix__
type StyledStyleSheet = StyleSheet & {
  __prefix__?: string;
};

type CreateStyleSheetType = [prefix: string, stylesOrFunc: StyleSheet | ((props: any) => StyleSheet)];

export const createStyleSheet = (
  prefix: string,
  stylesOrFunc: StyleSheet | ((props: any) => StyleSheet),
): CreateStyleSheetType => {
  return [prefix, stylesOrFunc];
};

// Function to inject styles and return class names
export const useStyleSheet = (
  userStyles: CreateStyleSheetType,
  props: { [key: string]: any } | null
): { [key: string]: string } => {
  const [prefix, stylesOrFunc] = userStyles;

  const styleSheet: StyledStyleSheet = {
    ...(typeof stylesOrFunc === 'function' ? stylesOrFunc(props || {}) : stylesOrFunc),
    __prefix__: prefix,
  } as StyledStyleSheet;
  
  const classNames = useMemo(() => {
    const classMap: { [key: string]: string } = {};
    const prefix = styleSheet.__prefix__; // Get the prefix from the stylesheet
    for (const key in styleSheet) {
      if (key !== '__prefix__' && styleSheet.hasOwnProperty(key)) {
        classMap[key] = `${prefix}-${key}`; // Use the prefix and key to form class names
      }
    }
    return classMap;
  }, [styleSheet]);

  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';

    const styles = Object.keys(styleSheet).map(key => {
      if (key !== '__prefix__') {
        let style = styleSheet[key];
        // Example: Conditionally modify styles based on props
        if (props && props[key]) {
          style = { ...style, ...props[key] };
        }
        const className = classNames[key];
        const cssString = Object.keys(style).map(prop => {
          const cssProp = prop as keyof React.CSSProperties;
          return `${prop.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${style[cssProp]};`;
        }).join(" ");
        return `.${className} { ${cssString} }`;
      }
      return '';
    }).join(" ");

    styleElement.appendChild(document.createTextNode(styles));
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, [styleSheet, classNames, props]);

  return classNames;
};

// Examples:
// // Define your styles
// const appStyleSheetWithProps = createStyleSheet('appStyles', ({ isRed }: { isRed: boolean }) => ({
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     color: isRed ? 'red' : 'black',
//     fontSize: '100px',
//   },
// }));

// const appStyleSheetWithoutProps = createStyleSheet('appStyles', {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     color: 'black',
//     fontSize: '100px',
//   },
// });

// interface MyComponentProps {
//   isRed?: boolean;
// }

// const MyComponent: React.FC<MyComponentProps> = ({ isRed }) => {
//   // Choose the appropriate style sheet based on props presence
//   const styleSheet = isRed !== undefined ? appStyleSheetWithProps : appStyleSheetWithoutProps;
//   const classes = useStyleSheet(styleSheet, { isRed });

//   return (
//     <div className={classes.container}>
//       Hello World!
//     </div>
//   );
// };

// export default MyComponent;
