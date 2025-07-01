import { render } from '@testing-library/react';
import React from 'react';
import { createStyleSheet, useStyleSheet } from './stylesheet';

describe('createStyleSheet', () => {
  it('returns an object with name and getStyles', () => {
    const sheet = createStyleSheet('foo', (props: { color: string }) => ({
      root: { color: props.color },
    }));
    expect(sheet.name).toBe('foo');
    expect(typeof sheet.getStyles).toBe('function');
  });

  it('getStyles returns correct styles', () => {
    const sheet = createStyleSheet('bar', (props: { size: number }) => ({
      root: { fontSize: props.size },
    }));
    expect(sheet.getStyles({ size: 12 })).toEqual({ root: { fontSize: 12 } });
  });
});

describe('useStyleSheet', () => {
  const sheet = createStyleSheet('test', (props: { color: string }) => ({
    root: { color: props.color, fontWeight: 'bold' },
    button: {
      background: props.color,
      '&:hover': { background: 'black' },
    },
  }));

  function TestComponent(props: { color: string }) {
    const classes = useStyleSheet(sheet, props);
    return React.createElement(
      'div',
      { className: classes.root },
      React.createElement('button', { className: classes.button }, 'Btn'),
    );
  }

  it('returns class names for each style key', () => {
    const { container } = render(
      React.createElement(TestComponent, { color: 'red' }),
    );
    const div = container.querySelector('div');
    const button = container.querySelector('button');
    expect(div?.className).toMatch(/^test-root-/);
    expect(button?.className).toMatch(/^test-button-/);
  });

  it('generates unique class names for different props', () => {
    const { container: c1 } = render(
      React.createElement(TestComponent, { color: 'red' }),
    );
    const { container: c2 } = render(
      React.createElement(TestComponent, { color: 'blue' }),
    );
    const class1 = c1.querySelector('div')?.className;
    const class2 = c2.querySelector('div')?.className;
    expect(class1).not.toBe(class2);
  });

  it('injects CSS into the document', () => {
    document.head.innerHTML = '';
    render(React.createElement(TestComponent, { color: 'green' }));
    const styles = Array.from(document.head.querySelectorAll('style')).map(
      (s) => s.textContent,
    );
    expect(styles.some((css) => css?.includes('color:green'))).toBe(true);
    expect(styles.some((css) => css?.includes(':hover'))).toBe(true);
  });

  it('does not inject duplicate CSS', () => {
    document.head.innerHTML = '';
    render(React.createElement(TestComponent, { color: 'purple' }));
    const before = document.head.querySelectorAll('style').length;
    render(React.createElement(TestComponent, { color: 'purple' }));
    const after = document.head.querySelectorAll('style').length;
    expect(after).toBe(before);
  });
});
