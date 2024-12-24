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
  border-bottom: 2px solid ${colors.blueGray070};
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
`;

const StyledLink = styled(Link)<{ selected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: ${(props) => (props.selected ? colors.blueGray070 : 'none')};
`;

const Border = styled.div<{ selected: boolean }>`
  border-bottom: ${(props) =>
    props.selected ? `5px solid ${colors.blueGray070}` : 'none'};
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
            {label === tab ? (
              <Border selected={label === tab} />
            ) : (
              <div style={{ height: '5px' }} />
            )}
          </StyledLink>
        ))}
      </Buttons>
    </Wrapper>
  );
};
