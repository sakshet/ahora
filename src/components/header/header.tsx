import { colors } from '@Core/colors';
import { Link } from '@Core/link';
import { Heading, Text } from '@Core/text';
import { createStyleSheet, useStyleSheet } from '@Core/theme';
import React from 'react';

const headerStyleSheet = createStyleSheet('headerStyle', () => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '40px',
    padding: '5px 30px',
    background: colors.blue010,
  },
}));
export const Header = () => {
  const classes = useStyleSheet(headerStyleSheet, null);
  return (
    <div className={classes.container}>
      <Link to="/">
        <Heading typography="heading06">AHORA</Heading>
      </Link>
      <Actions />
    </div>
  );
};

const actionStyleSheet = createStyleSheet('actionStyles', () => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: '30px',
  },
}));
const Actions = () => {
  const classes = useStyleSheet(actionStyleSheet, null);
  return (
    <div className={classes.container}>
      <Link to="/mortgage-calculator">
        <Text typography="body04">Mortgage Calculator</Text>
      </Link>
      <Link to="/about">
        <Text typography="body04">About</Text>
      </Link>
    </div>
  );
};

// import { useServicesData } from '@Context';
// import { colors, Icon, Link, Text } from '@Core';
// import {
//   dragOption,
//   formerOptions,
//   latterOptions,
//   HEADER_HEIGHT,
//   HEADER_PADDING,
//   MIN_SIZE_FOR_DESKTOP,
//   MIN_SIZE_FOR_SMALL_SCREEN,
// } from '@Utils/constants';
// import { Service } from '@Utils/types';

// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   background-color: ${colors.black};
//   flex-shrink: 0;
//   z-index: 1000;
//   position: fixed;
//   width: 100%;
//   &:hover {
//     opacity: 100%;
//   }
// `;

// const Content = styled.div`
//   padding: 10px 20px;
//   width: 100%;
//   box-sizing: border-box;
//   @media (min-width: ${MIN_SIZE_FOR_DESKTOP}px) {
//     width: 70%;
//   }
// `;

// const Menu = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   width: 100%;
//   color: ${colors.gray050};
//   height: ${HEADER_HEIGHT};
// `;

// const SubMenu = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: center;
//   padding: ${HEADER_PADDING}px 0;
//   margin-top: 10px;
//   gap: 20px;
//   border-top: 2px solid ${colors.gray100};
// `;

// export const Header = ({
//   onSubMenuHide,
//   onSubMenuShow,
// }: {
//   onSubMenuHide: () => void;
//   onSubMenuShow: () => void;
// }) => {
//   const { options } = useServicesData();
//   const [subMenu, setSubMenu] = useState<Service[]>([]);
//   const [width, setWidth] = useState<number>(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => setWidth(window.innerWidth);
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     if (subMenu.length) onSubMenuShow();
//     else onSubMenuHide();
//   }, [subMenu]);

//   return (
//     <Container onMouseLeave={() => setSubMenu([])}>
//       <Content>
//         <Menu>
//           {(width > MIN_SIZE_FOR_SMALL_SCREEN
//             ? options
//             : [...formerOptions, ...latterOptions, dragOption]
//           ).map((option, key) => (
//             <MenuItem
//               key={key}
//               onClick={() => setSubMenu([])}
//               onHover={() => setSubMenu(option.subServices || [])}
//               option={option}
//             />
//           ))}
//         </Menu>
//         {subMenu.length > 0 && (
//           <SubMenu>
//             {subMenu.map((option, key) => (
//               <MenuItem
//                 key={key}
//                 large
//                 onClick={() => setSubMenu([])}
//                 option={option}
//               />
//             ))}
//           </SubMenu>
//         )}
//       </Content>
//     </Container>
//   );
// };

// const MenuItemWrapper = styled.div`
//   color: ${colors.white};
//   opacity: 60%;
//   &:hover {
//     opacity: 80%;
//   }
// `;

// const MenuItem = ({
//   large = false,
//   onClick,
//   onHover,
//   option,
// }: {
//   large?: boolean;
//   onClick: () => void;
//   onHover?: () => void;
//   option: Service;
// }) => {
//   return (
//     <MenuItemWrapper onMouseEnter={onHover}>
//       <Text typography={large ? 'body01' : 'body07'}>
//         <Link to={option.path || ''} onClick={onClick}>
//           {option.icon && (
//             <Icon name={option.icon} type={option.iconType || 'outlined'} />
//           )}
//           {option.label}
//         </Link>
//       </Text>
//     </MenuItemWrapper>
//   );
// };
