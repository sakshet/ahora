import React, { ReactNode } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import styled from 'styled-components';

export interface LinkProps extends RouterLinkProps {
  to: string;
  children: ReactNode;
}

const StyledRouterLink = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
  &:hover {
    transform: scale(1.03);
  }
`;

export const Link = ({ to, children, ...props }: LinkProps) => {
  return (
    <StyledRouterLink to={to} {...props}>
      {children}
    </StyledRouterLink>
  );
};
