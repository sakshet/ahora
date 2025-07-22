import { Heading } from '@Core/text';
import { createStyleSheet, useStyleSheet, useTheme, Theme } from '@Core/theme';
import React, { MouseEventHandler } from 'react';

const buttonStyleSheet = createStyleSheet(
  'buttonStyles',
  ({ disabled, theme }: { disabled: boolean; theme: Theme }) => ({
    container: {
      marginTop: '12px',
      padding: '8px 16px',
      borderRadius: '3px',
      border: 'none',
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: disabled ? theme.disabled : theme.primary,
      color: disabled ? theme.error : theme.textOnPrimary,
      transition: 'background 0.2s',
    },
  }),
);
export const Button = ({
  children,
  disabled = false,
  onClick,
}: {
  children: string | JSX.Element;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
}) => {
  const { theme } = useTheme();
  const classes = useStyleSheet(buttonStyleSheet, { disabled, theme });
  return (
    <button
      className={classes.container}
      onClick={!disabled ? onClick : undefined}
      type="submit"
    >
      {typeof children === 'string' ? (
        <Heading typography="heading09">{children}</Heading>
      ) : (
        children
      )}
    </button>
  );
};
