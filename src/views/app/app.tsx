import { Header } from '@Components';
import { AppStateProvider, ServerStateProvider } from '@Context';
import { colors } from '@Core/colors';
import { tabUrls } from '@Utils/constants';
import { Homepage } from '@Views/homepage';

import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
  background: ${colors.gray030};
`;

const AppRoutes = () => {
  return (
    <Wrapper>
      <Header />
      <Routes>
      <Route path="/" element={<Homepage />} />
        {Object.values(tabUrls).map((url) => (
          <Route key={url} path={url} element={<Homepage />} />
        ))}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Wrapper>
  );
};
