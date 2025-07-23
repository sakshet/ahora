import { Heading } from '@Core/text';
import { createStyleSheet, useStyleSheet, Theme, useTheme } from '@Core/theme';
import React, { useEffect, useRef, useState } from 'react';

export interface InputProps {
  format?: (value: string) => string;
  label?: string;
  max?: number;
  min?: number;
  onChange: (value: number | string) => void;
  onTouched?: () => void;
  placeholder?: string;
  required?: boolean;
  step?: number;
  type?: 'number' | 'text';
  value: number | string;
}

function getRandomId() {
  return 'input-' + Math.random().toString(36).slice(2, 10);
}

function defaultNumberFormat(val: string): string {
  if (val === '' || val === '-' || val === '.' || val === '-.') return val;
  const [intPart, decPart] = val.split('.');
  // Remove leading zeros except for "0"
  const intPartClean = intPart.replace(/^0+(?!$)/, '') || '0';
  const intFormatted = parseInt(intPartClean, 10).toLocaleString('en-GB');
  if (val.endsWith('.') && decPart === undefined) return `${intFormatted}.`;
  return decPart !== undefined ? `${intFormatted}.${decPart}` : intFormatted;
}

const inputStyleSheet = createStyleSheet(
  'inputStyles',
  ({ theme }: { theme: Theme }) => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '12px',
      marginBottom: '16px',
      width: '100%',
    },
    input: {
      display: 'flex',
      flexDirection: 'column',
      padding: '6px 10px',
      borderRadius: '4px',
      border: `1px solid ${theme.divider}`,
      width: '100%',
      boxSizing: 'border-box',
      background: theme.background,
      color: theme.text,
    },
  }),
);
export function Input({
  format,
  label,
  max,
  min,
  onChange,
  onTouched,
  placeholder,
  required,
  step,
  type = 'text',
  value,
}: InputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState(
    value === 0 ? '' : String(value),
  );
  const [inputId] = useState(getRandomId());

  useEffect(() => {
    setInternalValue(value === 0 ? '' : String(value));
  }, [value]);

  const displayValue = format
    ? format(internalValue)
    : type === 'number'
      ? defaultNumberFormat(internalValue)
      : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/,/g, '');
    setInternalValue(val);

    if (type === 'number') {
      // Allow empty, '-', '.', or '-.' for typing
      if (/^-?\d*\.?\d*$/.test(val)) {
        if (val === '' || val === '-' || val === '.' || val === '-.') {
          onChange('');
        } else {
          onChange(Number(val));
        }
      }
    } else {
      onChange(val);
    }
    if (onTouched) onTouched();
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onTouched) onTouched();
    if (type === 'number') {
      const val = e.target.value.replace(/,/g, '');
      if (val === '' || val === '-' || val === '.' || val === '-.') {
        setInternalValue('');
        onChange('');
      } else {
        const num = parseFloat(val);
        setInternalValue(isNaN(num) ? '' : String(num));
        onChange(isNaN(num) ? '' : num);
      }
    }
  };

  const { theme } = useTheme();
  const classes = useStyleSheet(inputStyleSheet, { theme });
  return (
    <div className={classes.container}>
      {label && <Heading typography="heading09">{label}</Heading>}
      <input
        ref={ref}
        className={classes.input}
        type="text"
        id={inputId}
        name={inputId}
        value={displayValue}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        required={required}
        onFocusCapture={() => ref.current?.select()}
        onBlur={handleBlur}
        onMouseDown={(e) => {
          if (ref.current) {
            e.preventDefault();
            ref.current.select();
          }
        }}
        onChange={handleChange}
        inputMode={type === 'number' ? 'decimal' : undefined}
        autoComplete="off"
      />
    </div>
  );
}
