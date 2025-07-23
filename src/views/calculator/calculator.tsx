import { Button } from '@Core/button';
import { Input } from '@Core/input';
import { Text } from '@Core/text';
import { createStyleSheet, Theme, useStyleSheet, useTheme } from '@Core/theme';
import { CalculatorField } from '@Utils/types';
import React, { useState } from 'react';

type CalculatorProps<T> = {
  title: string;
  fields: CalculatorField[];
  initialValues: T;
  calculate: (values: T) => number | null;
  resultLabel: (result: number) => string;
};

const styleSheet = createStyleSheet(
  'calculatorStyles',
  ({ theme }: { theme: Theme }) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      height: '100%',
      width: '100%',
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
      width: '100%',
    },
  }),
);
export const Calculator = <T extends Record<string, any>>({
  title,
  fields,
  initialValues,
  calculate,
  resultLabel,
}: CalculatorProps<T>) => {
  const [input, setInput] = useState<T>(initialValues);
  const [result, setResult] = useState<number | null>(null);

  const handleChange = (key: string, val: any) => {
    setInput((prev) => ({ ...prev, [key]: val === '' ? 0 : Number(val) }));
  };

  const handleCalculate = () => setResult(calculate(input));

  const { theme } = useTheme();
  const classes = useStyleSheet(styleSheet, { theme });
  return (
    <div className={classes.container}>
      <Text typography="body01">{title}</Text>
      <div className={classes.content}>
        {fields.map((field) => (
          <Input
            key={field.key}
            label={field.label}
            type="number"
            value={input[field.key]}
            min={field.min}
            max={field.max}
            step={field.step}
            required={field.required}
            onChange={(val) => handleChange(field.key, val)}
          />
        ))}
        <Button onClick={handleCalculate}>Calculate</Button>
      </div>
      <div>
        <Text typography="body04">
          {result !== null
            ? resultLabel(result)
            : 'Please fill all info and click Calculate'}
        </Text>
      </div>
    </div>
  );
};
