import React from 'react';
import { createStyleSheet, useStyleSheet } from '../core/styles/styles';

const appStyleSheet = createStyleSheet('appStyles', ({ isRed }: { isRed: boolean; }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    color: isRed ? 'red' : 'black',
    fontSize: '100px',
  },
}));
export const App = () => {
  const classes = useStyleSheet(appStyleSheet, { isRed: true });
  return (
    <div className={classes.container}>
      Hello World!
    </div>
  );
}