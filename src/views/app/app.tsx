import { Header } from '@Components';
import { AppStateProvider, ServerStateProvider } from '@Context';
import { useServicesData } from '@Context/data-processors';
import { HEADER_HEIGHT, HEADER_PADDING } from '@Utils/constants';
import { Service } from '@Utils/types';
import { Content, MortgageCalculator } from '@Views';

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
import { colors } from '@Core/colors';

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

const generateRoutes = (services: Service[]): JSX.Element[] => {
  const routes: JSX.Element[] = [];

  const createRoutes = (services: Service[]) => {
    services.forEach((service) => {
      routes.push(
        <Route key={service.path} path={service.path} element={<StyledRoute><Content /></StyledRoute>} />,
      );
      if (service.subServices && service.subServices.length > 0) {
        createRoutes(service.subServices);
      }
    });
  };

  createRoutes(services);
  return routes;
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
`;
const StyledRoute = styled.div`
  flex-grow: 1;
  overflow: auto;
  background: ${colors.gray010};
  position: absolute;
  width: 100%;
  margin-top: 45px;
  margin-top: ${HEADER_HEIGHT + (2 * HEADER_PADDING)}px;
`;
export const AppRoutes = () => {
  const { options } = useServicesData();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirectPath = params.get('redirect');
    options;
    if (redirectPath) {
      navigate(redirectPath);
    }
  }, [navigate, location.search]);

  return (
    <Wrapper>
      <Header />
      <Routes>
        <Route path="/" element={<StyledRoute><Content /></StyledRoute>} />
        <Route path="/mortgage-calculator" element={
          <StyledRoute><MortgageCalculator /></StyledRoute>
          } />
        {generateRoutes(options)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Wrapper>
  );
};
