import { Link } from '@Core/link';
import { colors, createStyleSheet, useStyleSheet } from '@Core/styles';
import { Heading, Text } from '@Core/text';
import React from 'react';

const headerStyleSheet = createStyleSheet('headerStyles', {
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: '5px 40px',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${colors.white}`,
    '@media only screen and (max-width: 300px)': {
      flexDirection: 'column',
      height: '70px',
      alignItems: 'flex-start',
    },
  },
  navigation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '40px',
    '@media only screen and (max-width: 300px)': {
      justifyContent: 'flex-end',
      width: '100%',
    },
  },
});
export const Header = () => {
  const classes = useStyleSheet(headerStyleSheet, null);
  return (
    <div className={classes.container} data-testid="header-container">
      <Heading typography="heading07">
        <Link to="">AHORA</Link>
      </Heading>
      <div className={classes.navigation}>
        <Heading typography="heading10">
          <Link to="/about">About Us</Link>
        </Heading>
        <Heading typography="heading10">
          <Link to="/login">Login / Sign Up</Link>
        </Heading>
      </div>
    </div>
  );
};
