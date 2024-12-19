import { colors } from '@Core/colors';
import { Link } from '@Core/link';
import { Heading, Text } from '@Core/text';
import { APP_NAME } from '@Utils/constants';

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

const StyledLink = styled(Link)<{ selected: boolean; }>`
  border-bottom: ${p => (p.selected ? `5px solid ${colors.gray060}` : "none")} !important;
  padding-bottom: 5px;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

enum Tab {
  ABOUT = 'about',
  LOGIN = 'login',
}

const tabs = {
  [Tab.ABOUT]: {
    label: 'About',
  },
  [Tab.LOGIN]: {
    label: 'Log In / Sign Up',
  }
};

export const Header = () => {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);
  const appName: string = APP_NAME.toUpperCase();

  return (
    <Wrapper>
      <Link to={'/'} onClick={() => setActiveTab(null)}>
        <Heading typography="heading04">{appName}</Heading>
      </Link>
      <Buttons>
        {Object.keys(tabs).map((key) => (
          <StyledLink key={key} to={key} onClick={() => setActiveTab(key as Tab)} selected={key === activeTab}>
            <Text typography='body04'>{tabs[key as Tab].label}</Text>
          </StyledLink>
        ))}
      </Buttons>
    </Wrapper>
  );
};