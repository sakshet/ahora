import { Text } from '@Core/text';
import { createStyleSheet, useStyleSheet } from '@Core/theme';
import React from 'react';

const homepageStyleSheet = createStyleSheet('homepageStyles', () => ({
  container: {
    display: 'flex',
    height: '100%',
    gap: '10px',
  },
}));

export const Homepage = () => {
  const classes = useStyleSheet(homepageStyleSheet, null);
  return (
    <div className={classes.container}>
      <Text typography="body01">Welcome</Text>
    </div>
  );
};
