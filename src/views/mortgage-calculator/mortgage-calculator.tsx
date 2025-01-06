import { colors } from '@Core/colors';
import { MIN_SIZE_FOR_DESKTOP } from '@Utils/constants';
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.gray020};
`;

const Content = styled.div`
  padding: 10px 20px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: fixed;
  @media (min-width: ${MIN_SIZE_FOR_DESKTOP}px) {
    width: 70%;
  }
`;
export const MortgageCalculator = () => {
  return (
    <Container>
      <Content>Mortgage Calculator</Content>
    </Container>
  );
};
