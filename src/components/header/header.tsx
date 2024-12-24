import { useAppState } from '@Context';
import { colors, Heading, Link, Text } from '@Core';
import { tabUrls, APP_NAME, Tab } from '@Utils';

import React, { useEffect, useState } from 'react';
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
  const { state } = useAppState();
  const [tab, setTab] = useState<Tab | null>(state.activeTab);

  useEffect(() => {
    setTab(state.activeTab);
  }, [state.activeTab]);

  return (
    <Wrapper>
      <Link to={'/'}>
        <Heading typography="heading04">{APP_NAME.toUpperCase()}</Heading>
      </Link>
      <Buttons>
        {Object.values(Tab).map((label) => (
          <StyledLink key={label} selected={label === tab} to={tabUrls[label]}>
            <Text typography="body04">{label}</Text>
          </StyledLink>
        ))}
      </Buttons>
    </Wrapper>
  );
};
