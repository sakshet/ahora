import { Header } from '@Components/header';
import { AppStateProvider, ServerStateProvider } from '@Context/context';
import { colors } from '@Core/colors';
import { Homepage } from '@Views/homepage';

import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

export const App = () => {
  return (
    <AppStateProvider>
      <ServerStateProvider>
        <AppRoutes />
      </ServerStateProvider>
    </AppStateProvider>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
  height: 100%;
  background: ${colors.gray090};
  color: ${colors.gray050};
`;
const AppRoutes = () => {
  return (
    <Wrapper>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="*" element={<Homepage />} /> */}
        </Routes>
      </Router>
    </Wrapper>
  );
};
