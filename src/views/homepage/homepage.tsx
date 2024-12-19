import { Heading, Text } from '@Core/text';

import React from 'react';
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

export const Homepage = () => {
  return (
    <Wrapper>
      <Heading typography='heading02'>We'll be back soon</Heading>
      <Text typography='body01'>All good things take time</Text>
    </Wrapper>
  );
};