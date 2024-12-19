import { colors } from '@Core/colors';
import { Heading, Text } from '@Core/text';
import { APP_NAME } from '@Utils/constants';

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

const ButtonWrapper = styled.div<{ selected: boolean; }>`
  border: none;
  border-bottom: ${p => (p.selected ? `2px solid ${colors.gray060}` : "none")};
  padding-bottom: 5px;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

enum Tab {
  ABOUT = 'About',
  LOGIN = 'Login',
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
  const [activeTab, setActiveTab] = useState<Tab>(Tab.ABOUT);
  const appName: string = APP_NAME.toUpperCase();

  const onBtnClick = (key: Tab) => {
    setActiveTab(key);
  };

  return (
    <Wrapper>
      <Heading typography="heading04">{appName}</Heading>
      <Buttons>
        {Object.keys(tabs).map((key) => (
          <Link key={key} to={`/${key}`} onClick={() => onBtnClick(key as Tab)}>
            <ButtonWrapper selected={key === activeTab}>
              <Text typography='body04'>{tabs[key as Tab].label}</Text>
            </ButtonWrapper>
          </Link>
        ))}
      </Buttons>
    </Wrapper>
  );
};