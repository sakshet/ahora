import { useAppState } from '@Context';
import { About, Homepage } from '@Views';
import { Login } from '@Views/login';

import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  height: 100%;
  width: 100%;
`;

const content: { [key: string]: ReactElement } = {
  'About': <About />,
  'Login': <Login />,
};

export const Content = () => {
  const { state } = useAppState();

  return (
    <Wrapper>
      {state.activeTab ? content[state.activeTab] : <Homepage />}
    </Wrapper>
  );
};
