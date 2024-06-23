import { createStyleSheet, useStyleSheet } from "@Core/styles";
import React, { ReactNode } from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

export interface LinkProps extends RouterLinkProps {
  to: string;
  children: ReactNode;
}

const linkStyleSheet = createStyleSheet("linkStyles", {
  link: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      filter: `brightness(75%)`,
    },
  },
});
export const Link = ({ to, children, ...props }: LinkProps) => {
  const classes = useStyleSheet(linkStyleSheet, null);
  return (
    <RouterLink to={to} {...props} className={classes.link}>
      {children}
    </RouterLink>
  );
};
