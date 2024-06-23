import { createStyleSheet } from './createStyleSheet'; // Adjust the import path as per your project structure

describe('createStyleSheet', () => {
  it('creates a stylesheet with given styles', () => {
    const [prefix, styles] = createStyleSheet('test', {
      link: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
          color: 'red',
        },
      },
    });

    const expectedStyles = JSON.stringify({
      link: {
        textDecoration: 'none',
        color: 'inherit',
        '&': {
          '&:hover': {
            color: 'red',
          },
        },
      },
    });

    expect(prefix).toBe('test');
    expect(JSON.stringify(styles)).toEqual(expectedStyles);
  });
});