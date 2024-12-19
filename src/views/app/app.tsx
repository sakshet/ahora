import { Header } from '@Components/header';
import { AppStateProvider, ServerStateProvider } from '@Context/context';
import { colors } from '@Core/colors';
import { Homepage } from '@Views/homepage';

import React from 'react';
import { Route, Routes } from 'react-router-dom';
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

const Wrapper = styled.div`
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
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Homepage />} />
        <Route path="/login" element={<Homepage />} />
      </Routes>
    </Wrapper>
  );
};