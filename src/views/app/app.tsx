import { Header } from '@Components';
import { AppStateProvider, ServerStateProvider } from '@Context';
import { colors } from '@Core/colors';
import { tabUrls } from '@Utils/constants';
import { Homepage } from '@Views/homepage';
import React, { useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle } from '../../global-styles';
// import { BrowserRouter as Router, Route, Routes, useNavigate, useLocation } from 'react-router-dom';

export const App = () => {
  return (
    <AppStateProvider>
      <ServerStateProvider>
        <GlobalStyle />
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
  font-family: 'OregonBold', sans-serif;
`;

const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get('redirect');
    if (redirectPath) {
      navigate(redirectPath);
    }
  }, [navigate, location.search]);

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
