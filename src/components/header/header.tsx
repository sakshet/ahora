import { Link } from '@Core/link';
import { Heading, Text } from '@Core/text';
import { createStyleSheet, useStyleSheet, useTheme, Theme } from '@Core/theme';
import React, { useEffect, useRef, useState } from 'react';

const headerStyleSheet = createStyleSheet(
  'headerStyle',
  ({ theme }: { theme: Theme }) => ({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '40px',
      padding: '5px 30px',
      background: theme.backgroundElevated,
      borderBottom: `1px solid ${theme.divider}`,
      color: theme.text,
    },
  }),
);

const actionStyleSheet = createStyleSheet(
  'actionStyles',
  ({ theme }: { theme: Theme }) => ({
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: '30px',
      position: 'relative',
    },
    text: {
      color: theme.textOnPrimary,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'row',
      gap: '5px',
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      right: 0,
      minWidth: '250px',
      background: theme.backgroundElevated,
      border: `1px solid ${theme.divider}`,
      borderRadius: '6px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      zIndex: 100,
      padding: '8px 0',
      marginTop: '6px',
    },
    dropdownItem: {
      display: 'flex',
      flexDirection: 'row',
      gap: '10px',
      padding: '8px 20px',
      color: theme.text,
      cursor: 'pointer',
      textDecoration: 'none',
      alignItems: 'center',
      '&:hover': {
        background: theme.backgroundAlt,
      },
    },
  }),
);

const calculators = [
  { label: 'Compound Interest', path: '/compound-interest' },
  { label: 'Mortgage', path: '/mortgage-calculator' },
  // Add more calculators here
];

export const Header = () => {
  const { theme } = useTheme();
  const classes = useStyleSheet(headerStyleSheet, { theme });
  return (
    <div className={classes.container}>
      <Link to="/">
        <Heading typography="heading06">AHORA</Heading>
      </Link>
      <Actions />
    </div>
  );
};

const Actions = () => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  const classes = useStyleSheet(actionStyleSheet, useTheme());
  return (
    <div className={classes.container}>
      <div
        className={classes.text}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setOpen((v) => !v);
          }
        }}
        tabIndex={0}
        role="button"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Text className={classes.text} typography="body04">
          Calculators
        </Text>
      </div>
      {open && (
        <div className={classes.dropdown} ref={dropdownRef}>
          {calculators.map((calc) => (
            <Link
              key={calc.path}
              to={calc.path}
              className={classes.dropdownItem}
              onClick={() => setOpen(false)}
            >
              <Text typography="body04">{calc.label}</Text>
            </Link>
          ))}
        </div>
      )}
      <Link to="/about">
        <Text className={classes.text} typography="body04">
          About
        </Text>
      </Link>
    </div>
  );
};
