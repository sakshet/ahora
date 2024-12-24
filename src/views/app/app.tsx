import { Header } from '@Components';
import { useAppState, AppStateProvider, ServerStateProvider } from '@Context';
import { colors } from '@Core';
import { tabUrls, Tab } from '@Utils';
import { Homepage } from '@Views';
import React, { useEffect } from 'react';
import {
  useLocation,
  useNavigate,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyle } from '../../global-styles';

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
  const { dispatch } = useAppState();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const activeTab = Object.keys(tabUrls).find(
      (key) => tabUrls[key as Tab] === currentPath,
    ) as Tab | null;

    dispatch({ type: 'SET_ACTIVE_TAB', activeTab });
  }, [dispatch, location.pathname]);

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
