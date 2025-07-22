import { Heading } from '@Core/text';
import { createStyleSheet, useStyleSheet, useTheme, Theme } from '@Core/theme';
import React, { MouseEventHandler } from 'react';

const buttonStyleSheet = createStyleSheet(
  'buttonStyles',
  ({ theme }: { theme: Theme }) => ({
    container: {
      marginTop: '12px',
      padding: '8px 16px',
      borderRadius: '3px',
      border: 'none',
      cursor: 'pointer',
      background: theme.primary,
      color: theme.textOnPrimary,
      transition: 'background 0.2s',
    },
  }),
);
export const Button = ({
  children,
  onClick,
}: {
  children: string | JSX.Element;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  const { theme } = useTheme();
  const classes = useStyleSheet(buttonStyleSheet, { theme });
  return (
    <button className={classes.container} onClick={onClick} type="submit">
      {typeof children === 'string' ? (
        <Heading typography="heading09">{children}</Heading>
      ) : (
        children
      )}
    </button>
  );
};
