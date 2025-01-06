import { Header } from '@Components';
import { AppStateProvider, ServerStateProvider } from '@Context';
import { useServicesData } from '@Context/data-processors';
import { colors } from '@Core/colors';
import { HEADER_HEIGHT, HEADER_PADDING } from '@Utils/constants';
import { Service } from '@Utils/types';
import { Content, MortgageCalculator } from '@Views';

import React, { ReactElement, useEffect, useState } from 'react';
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
    <AppStateProvider useMockData={true}>
      <ServerStateProvider>
        <GlobalStyle />
        <AppRoutes />
      </ServerStateProvider>
    </AppStateProvider>
  );
};

const generateRoutes = (
  blurContent: boolean,
  services: Service[],
): JSX.Element[] => {
  const routes: JSX.Element[] = [];

  const createRoutes = (services: Service[]) => {
    services.forEach((service) => {
      routes.push(
        <Route
          key={service.path}
          path={service.path}
          element={
            <StyledComponent blurContent={blurContent}>
              <Content />
            </StyledComponent>
          }
        />,
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
const StyledRoute = styled.div<{ blurContent: boolean }>`
  flex-grow: 1;
  overflow: auto;
  background: ${colors.gray010};
  position: absolute;
  height: 100%;
  width: 100%;
  margin-top: ${HEADER_HEIGHT + 2 * HEADER_PADDING}px;
  opacity: ${(props) => (props.blurContent ? '25%' : '100%')};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledComponent = ({
  blurContent,
  children,
}: {
  blurContent: boolean;
  children: ReactElement;
}) => <StyledRoute blurContent={blurContent}>{children}</StyledRoute>;

export const AppRoutes = () => {
  const [blurContent, setBlurContent] = useState<boolean>(false);
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
      <Header
        onSubMenuHide={() => setBlurContent(false)}
        onSubMenuShow={() => setBlurContent(true)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <StyledComponent blurContent={blurContent}>
              <Content />
            </StyledComponent>
          }
        />
        <Route
          path="/mortgage-calculator"
          element={
            <StyledComponent blurContent={blurContent}>
              <MortgageCalculator />
            </StyledComponent>
          }
        />
        {generateRoutes(blurContent, options)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Wrapper>
  );
};
