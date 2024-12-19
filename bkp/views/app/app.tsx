import { Footer } from 'src/components/footer';
import { Header } from 'src/components/header';
import { AppStateProvider, ServerStateProvider } from 'src/context/context';
import { colors, createStyleSheet, useStyleSheet } from 'src/core/styles';
import { Homepage } from 'src/views/homepage';

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import './app.css';

const appStyles = createStyleSheet('appStyles', {
  app: {
    height: '100%',
    width: '100%',
    backgroundColor: colors.black,
    color: colors.white,
  },
});
export const App = () => {
  const classes = useStyleSheet(appStyles, null);
  return (
    <div className={classes.app}>
      <AppStateProvider>
        <ServerStateProvider>
          <AppContainer />
        </ServerStateProvider>
      </AppStateProvider>
    </div>
  );
};

const AppContainer = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Homepage />} />
      </Routes>
      <Footer />
    </Router>
  );
};
