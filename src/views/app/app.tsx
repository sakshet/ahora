import { Header } from '@Components';
import { AppStateProvider, ServerStateProvider } from '@Context';
import { colors } from '@Core';
import { Service } from '@Utils/types';
import { Content } from '@Views';
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
import { useServicesData } from '@Context/data-processors';

export const App = () => {
  return (
    <AppStateProvider useMockData={true}>
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
  padding: 0;
  height: 100%;
  background: ${colors.white};
  font-family: 'OregonBold', sans-serif;
`;

const generateRoutes = (services: Service[]): JSX.Element[] => {
  const routes: JSX.Element[] = [];

  const createRoutes = (services: Service[]) => {
    services.forEach((service) => {
      routes.push(<Route key={service.path} path={service.path} element={<Content />} />);
      if (service.subServices && service.subServices.length > 0) {
        createRoutes(service.subServices);
      }
    });
  };

  createRoutes(services);
  return routes;
};

const AppRoutes = () => {
  const services = useServicesData();

  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   const currentPath = location.pathname;
  //   const activeTab = Object.keys(tabUrls).find(
  //     (key) => tabUrls[key as Tab] === currentPath,
  //   ) as Tab | null;

  //   dispatch({ type: 'SET_ACTIVE_TAB', activeTab });
  // }, [dispatch, location.pathname]);

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
        <Route path="/" element={<Content />} />
        {generateRoutes(services)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Wrapper>
  );
};