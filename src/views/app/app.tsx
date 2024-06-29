import { Footer } from '@Components/footer';
import { Header } from '@Components/header';
import { AppStateProvider, ServerStateProvider } from '@Context/context';
import { colors, createStyleSheet, useStyleSheet } from '@Core/styles';
import { Homepage } from '@Views/homepage';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
