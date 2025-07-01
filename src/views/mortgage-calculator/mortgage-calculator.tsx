import { colors } from '@Core/colors';
import { Text } from '@Core/text';
import { createStyleSheet, useStyleSheet } from '@Core/theme';
import { MortgageInput } from '@Utils/types';
import React, { useEffect, useState } from 'react';

const defaultMortgageInput: MortgageInput = {
  deposit: 0,
  interest: 0,
  propertyPrice: 0,
  years: 0,
};

const calculatorStyleSheet = createStyleSheet('calculatorStyles', () => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    gap: '10px',
  },
}));
export const MortgageCalculator = () => {
  const classes = useStyleSheet(calculatorStyleSheet, null);
  return (
    <div className={classes.container}>
      <Header />
      <Content />
    </div>
  );
};

const contentStyleSheet = createStyleSheet('contentStyles', () => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    height: '100%',
    gap: '10px',
  },
  content: {
    padding: '10px',
    background: colors.gray040,
  },
}));
const Content = () => {
  const [input, setInput] = useState<MortgageInput>(defaultMortgageInput);
  const [responseReady, setResponseReady] = useState<boolean>(false);

  useEffect(() => {
    setResponseReady(Object.values(input).every((val) => val !== 0));
  }, [input]);

  const classes = useStyleSheet(contentStyleSheet, null);
  return (
    <div className={classes.container}>
      <div
        className={classes.content}
        role="button"
        tabIndex={0}
        onClick={() =>
          setInput({
            deposit: 100,
            interest: 100,
            propertyPrice: 100,
            years: 100,
          })
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setInput({
              deposit: 100,
              interest: 100,
              propertyPrice: 100,
              years: 100,
            });
          }
        }}
      >
        Content
      </div>
      <div className={classes.content}>
        {responseReady ? (
          <div>Response Ready</div>
        ) : (
          <div>Please fill all info</div>
        )}
      </div>
    </div>
  );
};

const headerStyleSheet = createStyleSheet('headerStyles', () => ({
  container: { display: 'flex' },
}));
const Header = () => {
  const classes = useStyleSheet(headerStyleSheet, null);
  return (
    <div className={classes.container}>
      <Text typography="body01">Mortgage Calculator</Text>
    </div>
  );
};
