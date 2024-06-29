import { Link } from '@Core/link';
import { colors, createStyleSheet, useStyleSheet } from '@Core/styles';
import { Heading, Text } from '@Core/text';
import React from 'react';

const footerStyleSheet = createStyleSheet('footerStyles', {
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: '5px 40px',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${colors.white}`,
    '@media only screen and (max-width: 300px)': {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    visibility: 'hidden',
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
export const Footer = () => {
  const classes = useStyleSheet(footerStyleSheet, null);
  return (
    <div className={classes.container}>
      <Heading typography="heading07">
        <Link to="">AHORA</Link>
      </Heading>
      <div className={classes.navigation}>
        <Text typography="body07">
          <Link to="/about">About Us</Link>
        </Text>
        <Text typography="body07">
          <Link to="/login">Login / Sign Up</Link>
        </Text>
      </div>
    </div>
  );
};
