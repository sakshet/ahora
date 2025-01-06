import { MIN_SIZE_FOR_DESKTOP } from '@Utils/constants';
import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
  position: fixed;
  @media (min-width: ${MIN_SIZE_FOR_DESKTOP}px) {
    width: 70%;
  };
`;
export const MortgageCalculator = () => {
  return (
      <Content>Mortgage Calculator</Content>
  );
};