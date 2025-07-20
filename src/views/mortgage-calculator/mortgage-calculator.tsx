import { Input } from '@Core/input';
import { Heading, Text } from '@Core/text';
import { createStyleSheet, Theme, useStyleSheet, useTheme } from '@Core/theme';
import { calculateMortgage } from '@Utils/common';
import { MortgageInput } from '@Utils/types';
import React, { useState } from 'react';

const defaultMortgageInput: MortgageInput = {
  deposit: 0,
  interest: 0,
  price: 0,
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

const contentStyleSheet = createStyleSheet(
  'contentStyles',
  ({ theme }: { theme: Theme }) => ({
    container: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      height: '100%',
      gap: '10px',
    },
    content: {
      padding: '10px',
      borderRadius: '8px',
      border: `1px solid ${theme.text}`,
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '12px',
      marginBottom: '16px',
    },
    label: {
      marginBottom: '4px',
      fontWeight: 600,
    },
    input: {
      padding: '6px 10px',
      borderRadius: '4px',
      border: `1px solid ${theme.text}`,
      fontSize: '1rem',
      width: '100%',
      boxSizing: 'border-box',
      background: theme.background,
      color: theme.text,
    },
    button: {
      marginTop: '12px',
      padding: '8px 16px',
      borderRadius: '4px',
      border: 'none',
      fontWeight: 600,
      cursor: 'pointer',
      background: theme.text,
      color: theme.background,
    },
  }),
);
const Content = () => {
  const [input, setInput] = useState<MortgageInput>(defaultMortgageInput);
  const [monthly, setMonthly] = useState<number | null>(null);
  const [touched, setTouched] = useState<boolean>(false);

  const handleCalculate = () => setMonthly(calculateMortgage(input));

  const { theme } = useTheme();
  const classes = useStyleSheet(contentStyleSheet, { theme });
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCalculate();
          }}
        >
          <div className={classes.inputGroup}>
            <Heading typography="heading09">Property Price</Heading>
            <Input
              type="number"
              value={input.price}
              onChange={(val) =>
                setInput({
                  ...input,
                  price: Number(String(val).replace(/,/g, '')),
                })
              }
              onTouched={() => setTouched(true)}
              className={classes.input}
              format={(val) =>
                val === '' || val === '0'
                  ? ''
                  : Number(val).toLocaleString('en-GB')
              }
            />
          </div>
          <div className={classes.inputGroup}>
            <Heading typography="heading09">Deposit</Heading>
            <Input
              type="number"
              value={input.deposit}
              onChange={(val) =>
                setInput({ ...input, deposit: val === '' ? 0 : Number(val) })
              }
              onTouched={() => setTouched(true)}
              className={classes.input}
              format={(val) =>
                val === '' || val === '0'
                  ? ''
                  : Number(val).toLocaleString('en-GB')
              }
            />
          </div>
          <div className={classes.inputGroup}>
            <Heading typography="heading09">Interest Rate (% per year)</Heading>
            <Input
              type="number"
              value={input.interest}
              onChange={(val) => setInput({ ...input, interest: Number(val) })}
              onTouched={() => setTouched(true)}
              className={classes.input}
              min={0}
              step={0.01}
              required
            />
          </div>
          <div className={classes.inputGroup}>
            <Heading typography="heading09">Years</Heading>
            <Input
              type="number"
              value={input.years}
              onChange={(val) => setInput({ ...input, years: Number(val) })}
              onTouched={() => setTouched(true)}
              className={classes.input}
              min={1}
              max={40}
              required
            />
          </div>
          <button className={classes.button} type="submit">
            Calculate
          </button>
        </form>
      </div>
      <div className={classes.content}>
        {touched && (
          <Text typography="body04">
            {monthly
              ? `Estimated Monthly Payment: £${monthly.toFixed(2)}`
              : 'Please fill all info and click Calculate'}
          </Text>
        )}
      </div>
    </div>
  );
};

const headerStyleSheet = createStyleSheet('headerStyles', () => ({
  container: { display: 'flex', marginBottom: '16px' },
}));
const Header = () => {
  const classes = useStyleSheet(headerStyleSheet, null);
  return (
    <div className={classes.container}>
      <Text typography="body01">Mortgage Calculator</Text>
    </div>
  );
};
