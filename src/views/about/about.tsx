import { Text } from '@Core/text';
import { createStyleSheet, useStyleSheet } from '@Core/theme';
import React from 'react';

const aboutStyleSheet = createStyleSheet('aboutStyles', () => ({
  container: {
    display: 'flex',
    height: '100%',
    gap: '10px',
  },
}));

export const About = () => {
  const classes = useStyleSheet(aboutStyleSheet, null);
  return (
    <div className={classes.container}>
      <Text typography="body01">About</Text>
    </div>
  );
};
