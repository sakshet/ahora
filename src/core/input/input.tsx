import React, { useRef, useState } from 'react';

export interface InputProps {
  className?: string;
  format?: (value: string) => string;
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

export function Input({
  className,
  format,
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

  React.useEffect(() => {
    setInternalValue(value === 0 ? '' : String(value));
  }, [value]);

  const displayValue = format ? format(internalValue) : internalValue;

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

  return (
    <input
      ref={ref}
      className={className}
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
  );
}
