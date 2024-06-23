import { createStyleSheet, useStyleSheet } from '@Core/styles';
import { Heading, Text } from '@Core/text';

import React from 'react';

const appStyleSheet = createStyleSheet('appStyles', {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
});
export const App = () => {
  const classes = useStyleSheet(appStyleSheet, null);
  return (
    <div className={classes.container}>
      <Text typography="body03">Sample Text</Text>
      <Heading typography="heading03">Sample Heading</Heading>
    </div>
  );
}