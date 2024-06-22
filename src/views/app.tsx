import { createStyleSheet, useStyleSheet } from '@Core/styles';
import { Heading, Text } from '@Core/text';
import React from 'react';

const appStyleSheet = createStyleSheet('appStyles', ({ isRed }: { isRed: boolean; }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
export const App = () => {
  const classes = useStyleSheet(appStyleSheet, { isRed: true });
  return (
    <div className={classes.container}>
      <Text typography="body03">Hello Text</Text>
      <Heading typography="heading03">Hello Text</Heading>
    </div>
  );
}