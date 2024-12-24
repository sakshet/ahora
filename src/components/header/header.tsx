import { colors } from '@Core/colors';
import { Link } from '@Core/link';
import { Heading, Text } from '@Core/text';
import { APP_NAME, Tab, tabUrls } from '@Utils/constants';

import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 2px solid ${colors.gray080};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
`;

const StyledLink = styled(Link)<{ selected: boolean }>`
  border-bottom: ${(p) =>
    p.selected ? `5px solid ${colors.gray080}` : 'none'} !important;
  padding-bottom: 5px;
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;

export const Header = () => {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const appName: string = APP_NAME.toUpperCase();

  return (
    <Wrapper>
      <Link to={'/'} onClick={() => setActiveTab(null)}>
        <Heading typography="heading04">{appName}</Heading>
      </Link>
      <Buttons>
        {Object.values(Tab).map((label) => (
          <StyledLink
            key={label}
            to={tabUrls[label]}
            onClick={() => setActiveTab(label as Tab)}
            selected={label === activeTab}
          >
            <Text typography="body04">{label}</Text>
          </StyledLink>
        ))}
      </Buttons>
    </Wrapper>
  );
};