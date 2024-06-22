import React, { useEffect, useMemo } from 'react';

// Type definition for the stylesheet
type StyleSheet = {
  [key: string]: React.CSSProperties;
};

// Type definition for the styled stylesheet which includes __prefix__
type StyledStyleSheet = StyleSheet & {
  __prefix__?: string;
};

// Function to create a stylesheet object with a specified prefix
export const createStyleSheet = (prefix: string, styles: StyleSheet): StyledStyleSheet => {
  const styledStyles: StyledStyleSheet = {
    ...styles, // Spread existing styles
  };
  styledStyles.__prefix__ = prefix; // Assign the prefix directly
  return styledStyles;
};

// Function to inject styles and return class names
export const useStyleSheet = (
  styleSheet: StyledStyleSheet,
  props: { [key: string]: any } | null
): { [key: string]: string } => {
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

// // Define your styles
// const styleSheet = createStyleSheet('abcStyles', {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: 'lightblue',
//     padding: '20px',
//     borderRadius: '5px',
//   },
//   heading: {
//     color: 'darkblue',
//   },
// });

// interface MyComponentProps {
//   isRed?: boolean;
//   fontSize?: string;
// }

// const MyComponent: React.FC<MyComponentProps> = ({ isRed, fontSize }) => {
//   const classes = useStyleSheet(styleSheet, { isRed, fontSize });

//   return (
//     <div className={classes.container}>
//       <h1 className={classes.heading}>Hello World!</h1>
//     </div>
//   );
// };

// export default MyComponent;
