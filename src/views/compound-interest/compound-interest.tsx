import { Button } from '@Core/button';
import { Input } from '@Core/input';
import { Text } from '@Core/text';
import { createStyleSheet, Theme, useStyleSheet, useTheme } from '@Core/theme';
import { calculateCompoundInterest } from '@Utils/common';
import { CompoundInput } from '@Utils/types';
import React, { useState } from 'react';

const defaultCompoundInput: CompoundInput = {
  principal: 0,
  rate: 0,
  timesCompounded: 1,
  years: 0,
  monthlyAddition: 0,
};

const styleSheet = createStyleSheet(
  'compoundStyles',
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

export const CompoundInterestCalculator = () => {
  const [input, setInput] = useState<CompoundInput>(defaultCompoundInput);
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => setResult(calculateCompoundInterest(input));

  const { theme } = useTheme();
  const classes = useStyleSheet(styleSheet, { theme });

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.content}>
        <Input
          label="Principal (£)"
          type="number"
          value={input.principal}
          onChange={(val) =>
            setInput({ ...input, principal: val === '' ? 0 : Number(val) })
          }
        />
        <Input
          label="Annual Interest Rate (%)"
          type="number"
          value={input.rate}
          onChange={(val) =>
            setInput({ ...input, rate: val === '' ? 0 : Number(val) })
          }
          min={0}
          step={0.01}
        />
        <Input
          label="Times Compounded Per Year"
          type="number"
          value={input.timesCompounded}
          onChange={(val) =>
            setInput({
              ...input,
              timesCompounded: val === '' ? 1 : Number(val),
            })
          }
          min={1}
          max={365}
        />
        <Input
          label="Years"
          type="number"
          value={input.years}
          onChange={(val) =>
            setInput({ ...input, years: val === '' ? 0 : Number(val) })
          }
          min={1}
          max={100}
        />
        <Input
          label="Monthly Addition (£)"
          type="number"
          value={input.monthlyAddition}
          onChange={(val) =>
            setInput({
              ...input,
              monthlyAddition: val === '' ? 0 : Number(val),
            })
          }
          min={0}
          step={0.01}
        />
        <Button onClick={handleCalculate}>Calculate</Button>
      </div>
      <div className={classes.content}>
        <Text typography="body04">
          {result !== null
            ? `Future Value: £${result.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
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
      <Text typography="body01">Compound Interest Calculator</Text>
    </div>
  );
};
