import { Button } from '@Core/button';
import { Input } from '@Core/input';
import { Text } from '@Core/text';
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
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      gap: '10px',
      background: theme.background,
      color: theme.text,
    },
    content: {
      padding: '10px',
      borderRadius: '4px',
      border: `1px solid ${theme.divider}`,
      background: theme.backgroundAlt,
      color: theme.text,
    },
  }),
);
const Content = () => {
  const [input, setInput] = useState<MortgageInput>(defaultMortgageInput);
  const [monthly, setMonthly] = useState<number | null>(null);

  const handleCalculate = () => setMonthly(calculateMortgage(input));

  const { theme } = useTheme();
  const classes = useStyleSheet(contentStyleSheet, { theme });
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Input
          label="Property Price (£)"
          type="number"
          value={input.price}
          onChange={(val) =>
            setInput({
              ...input,
              price: Number(String(val).replace(/,/g, '')),
            })
          }
        />
        <Input
          label="Deposit (£)"
          type="number"
          value={input.deposit}
          onChange={(val) =>
            setInput({ ...input, deposit: val === '' ? 0 : Number(val) })
          }
        />
        <Input
          label="Annual Interest Rate (%)"
          type="number"
          value={input.interest}
          onChange={(val) => setInput({ ...input, interest: Number(val) })}
          min={0}
          step={0.01}
          required
        />
        <Input
          label="Years"
          type="number"
          value={input.years}
          onChange={(val) => setInput({ ...input, years: Number(val) })}
          min={1}
          max={40}
          required
        />
        <Button onClick={handleCalculate}>Calculate</Button>
      </div>
      <div className={classes.content}>
        <Text typography="body04">
          {monthly
            ? `Estimated Monthly Payment: £${monthly.toFixed(2)}`
            : 'Please fill all info and click Calculate'}
        </Text>
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
