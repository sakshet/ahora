import { createStyleSheet, useStyleSheet } from '@Core/theme';
import React, { ReactNode } from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

export interface LinkProps extends RouterLinkProps {
  to: string;
  children: ReactNode;
}

const linkStyleSheet = createStyleSheet('linkStyles', () => ({
  container: {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      transform: `scale(1.03)`,
    },
  },
}));
export const Link = ({ to, children, ...props }: LinkProps) => {
  const classes = useStyleSheet(linkStyleSheet, null);
  return (
    <RouterLink className={classes.container} to={to} {...props}>
      {children}
    </RouterLink>
  );
};
