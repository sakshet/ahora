import { useServicesData } from '@Context';
import { colors, Icon, Link, Text } from '@Core';
import {
  dragOption,
  formerOptions,
  latterOptions,
  MIN_SIZE_FOR_DESKTOP,
  MIN_SIZE_FOR_SMALL_SCREEN,
} from '@Utils/constants';
import { Service } from '@Utils/types';

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.black};
  opacity: 95%;
  color: ${colors.white};
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  overflow-y: auto;
  &:hover {
    opacity: 100%;
  }
`;
const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
  color: ${colors.gray050};
  @media (min-width: ${MIN_SIZE_FOR_DESKTOP}px) {
    width: 70%;
  }
`;

export const Header = () => {
  const { options } = useServicesData();
  const [subMenu, setSubMenu] = useState<Service[]>([]);
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container onMouseLeave={() => setSubMenu([])}>
      <Menu>
        {(width > MIN_SIZE_FOR_SMALL_SCREEN
          ? options
          : [...formerOptions, ...latterOptions, dragOption]
        ).map((option, key) => (
          <MenuItem
            key={key}
            onHover={() => setSubMenu(option.subServices || [])}
            option={option}
          />
        ))}
      </Menu>
      {subMenu && <SubMenu options={subMenu} />}
    </Container>
  );
};

const slideInFromTop = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
  animation: ${slideInFromTop} 0.2s ease-out;
`;

const SubMenu = ({ options }: { options: Service[] }) => {
  return (
    <Wrapper>
      {options.map((option, key) => (
        <MenuItem key={key} large option={option} />
      ))}
    </Wrapper>
  );
};

const MenuItemWrapper = styled.div`
  color: ${colors.white};
  opacity: 60%;
  &:hover {
    opacity: 80%;
  }
`;

const MenuItem = ({
  large = false,
  onHover = () => undefined,
  option,
}: {
  large?: boolean;
  onHover?: () => void;
  option: Service;
}) => {
  return (
    <MenuItemWrapper onMouseEnter={onHover}>
      <Text typography={large ? 'body01' : 'body07'}>
        <Link to={option.path || ''}>
          {option.icon && (
            <Icon name={option.icon} type={option.iconType || 'outlined'} />
          )}
          {option.label}
        </Link>
      </Text>
    </MenuItemWrapper>
  );
};
