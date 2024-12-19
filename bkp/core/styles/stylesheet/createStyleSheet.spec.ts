import { createStyleSheet } from './createStyleSheet';

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

    const expectedStyles = {
      link: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
          color: 'red',
        },
      },
    };

    expect(prefix).toBe('test');
    expect(styles).toEqual(expectedStyles);
  });
});
