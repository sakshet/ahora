import { render } from '@testing-library/react';

import React from 'react';

import { createStyleSheet, useStyleSheet } from '../stylesheet';
import { StyleSheet } from './types';

describe('useStyleSheet', () => {
  it('should generate classNames correctly without props', () => {
    const styles: StyleSheet = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '16px',
      },
    };
    const prefix = 'appStyles';

    const Component = () => {
      const classNames = useStyleSheet(createStyleSheet(prefix, styles), null);
      return <div className={classNames.container}>Hello World!</div>;
    };

    const { container } = render(<Component />);
    const element = container.firstChild as HTMLElement;

    expect(element.className).toBe('appStyles-container');
  });

  it('should generate classNames correctly with props', () => {
    const styles: StyleSheet = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '16px',
      },
    };
    const prefix = 'appStyles';

    const Component = ({ isRed }: { isRed: boolean }) => {
      const classNames = useStyleSheet(createStyleSheet(prefix, styles), { isRed });
      return <div className={classNames.container}>Hello World!</div>;
    };

    const { container } = render(<Component isRed={true} />);
    const element = container.firstChild as HTMLElement;

    expect(element.className).toBe('appStyles-container');
  });

  it('should handle stylesOrFunc as a function and modify styles based on props', () => {
    const stylesFunc = (props: any): StyleSheet => ({
      container: {
        display: 'flex',
        flexDirection: props.isColumn ? 'column' : 'row',
        fontSize: '16px',
      },
    });
    const prefix = 'appStyles';

    const Component = ({ isColumn }: { isColumn: boolean }) => {
      const classNames = useStyleSheet(createStyleSheet(prefix, stylesFunc), { isColumn });
      return <div className={classNames.container}>Hello World!</div>;
    };

    const { container } = render(<Component isColumn={true} />);
    const element = container.firstChild as HTMLElement;

    expect(element.className).toBe('appStyles-container');
  });

  it('should handle stylesOrFunc as an object and set __prefix__', () => {
    const styles: StyleSheet = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        fontSize: '16px',
      },
    };
    const prefix = 'appStyles';

    const Component = () => {
      const classNames = useStyleSheet(createStyleSheet(prefix, styles), null);
      return <div className={classNames.container}>Hello World!</div>;
    };

    const { container } = render(<Component />);
    const element = container.firstChild as HTMLElement;

    expect(element.className).toBe('appStyles-container');
  });
});