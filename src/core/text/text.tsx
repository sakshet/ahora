import { useTheme } from '@Core/theme';
import React, { ReactNode } from 'react';

const commonStyles = (color: string): React.CSSProperties => ({
  margin: 0,
  textAlign: 'center',
  color,
});

type TextTypography =
  | 'body01'
  | 'body02'
  | 'body03'
  | 'body04'
  | 'body05'
  | 'body06'
  | 'body07'
  | 'body08'
  | 'body09'
  | 'body10';

type HeadingTypography =
  | 'heading01'
  | 'heading02'
  | 'heading03'
  | 'heading04'
  | 'heading05'
  | 'heading06'
  | 'heading07'
  | 'heading08'
  | 'heading09'
  | 'heading10';

type TextProps = {
  children: ReactNode;
  className?: string | undefined;
  typography: TextTypography;
};

export const Text = ({ children, className, typography }: TextProps) => {
  let fontSize = '16px'; // Default font size

  switch (typography) {
    case 'body01':
      fontSize = '24px';
      break;
    case 'body02':
      fontSize = '22px';
      break;
    case 'body03':
      fontSize = '20px';
      break;
    case 'body04':
      fontSize = '18px';
      break;
    case 'body05':
      fontSize = '16px'; // Default size (same as initial)
      break;
    case 'body06':
      fontSize = '14px';
      break;
    case 'body07':
      fontSize = '12px';
      break;
    case 'body08':
      fontSize = '10px';
      break;
    case 'body09':
      fontSize = '8px';
      break;
    case 'body10':
      fontSize = '6px';
      break;
  }

  const { theme } = useTheme();
  return (
    <p className={className} style={{ fontSize, ...commonStyles(theme.text) }}>
      {children}
    </p>
  );
};

type HeadingProps = {
  children: ReactNode;
  className?: string | undefined;
  typography: HeadingTypography;
};

export const Heading = ({ children, className, typography }: HeadingProps) => {
  let fontSize = '32px'; // Default font size

  switch (typography) {
    case 'heading01':
      fontSize = '48px';
      break;
    case 'heading02':
      fontSize = '42px';
      break;
    case 'heading03':
      fontSize = '36px';
      break;
    case 'heading04':
      fontSize = '32px'; // Default size (same as initial)
      break;
    case 'heading05':
      fontSize = '28px';
      break;
    case 'heading06':
      fontSize = '24px';
      break;
    case 'heading07':
      fontSize = '20px';
      break;
    case 'heading08':
      fontSize = '18px';
      break;
    case 'heading09':
      fontSize = '16px';
      break;
    case 'heading10':
      fontSize = '14px';
      break;
  }

  const { theme } = useTheme();
  return (
    <h1 className={className} style={{ fontSize, ...commonStyles(theme.text) }}>
      {children}
    </h1>
  );
};
