import { useServicesData } from '@Context';
import { colors, Icon, Link, Text } from '@Core';
import {
  dragOption,
  formerOptions,
  latterOptions,
  HEADER_HEIGHT,
  HEADER_PADDING,
  MIN_SIZE_FOR_DESKTOP,
  MIN_SIZE_FOR_SMALL_SCREEN,
} from '@Utils/constants';
import { Service } from '@Utils/types';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: ${colors.black};
  flex-shrink: 0;
  z-index: 1000;
  position: fixed;
  width: 100%;
  &:hover {
    opacity: 100%;
  }
`;

const Content = styled.div`
  padding: 10px 20px;
  width: 100%;
  box-sizing: border-box;
  @media (min-width: ${MIN_SIZE_FOR_DESKTOP}px) {
    width: 70%;
  }
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: ${colors.gray050};
  height: ${HEADER_HEIGHT};
`;

const SubMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: ${HEADER_PADDING}px 0;
  margin-top: 10px;
  gap: 20px;
  border-top: 2px solid ${colors.gray100};
`;

export const Header = ({
  onSubMenuHide,
  onSubMenuShow,
}: {
  onSubMenuHide: () => void;
  onSubMenuShow: () => void;
}) => {
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
    <Container
      onMouseLeave={() => {
        setSubMenu([]);
        onSubMenuHide();
      }}
    >
      <Content>
        <Menu>
          {(width > MIN_SIZE_FOR_SMALL_SCREEN
            ? options
            : [...formerOptions, ...latterOptions, dragOption]
          ).map((option, key) => (
            <MenuItem
              key={key}
              onClick={() => {
                setSubMenu([]);
                onSubMenuHide();
              }}
              onHover={() => {
                setSubMenu(option.subServices || []);
                onSubMenuShow();
              }}
              option={option}
            />
          ))}
        </Menu>
        {subMenu.length > 0 && (
          <SubMenu>
            {subMenu.map((option, key) => (
              <MenuItem
                key={key}
                large
                onClick={() => {
                  setSubMenu([]);
                  onSubMenuHide();
                }}
                option={option}
              />
            ))}
          </SubMenu>
        )}
      </Content>
    </Container>
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
  onClick,
  onHover,
  option,
}: {
  large?: boolean;
  onClick: () => void;
  onHover?: () => void;
  option: Service;
}) => {
  return (
    <MenuItemWrapper onMouseEnter={onHover}>
      <Text typography={large ? 'body01' : 'body07'}>
        <Link to={option.path || ''} onClick={onClick}>
          {option.icon && (
            <Icon name={option.icon} type={option.iconType || 'outlined'} />
          )}
          {option.label}
        </Link>
      </Text>
    </MenuItemWrapper>
  );
};
