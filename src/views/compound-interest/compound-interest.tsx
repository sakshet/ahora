import { calculateCompoundInterest } from '@Utils/common';
import { Calculator } from '@Views/calculator';
import React from 'react';

const fields = [
  { key: 'principal', label: 'Principal (£)', type: 'number', min: 0 },
  {
    key: 'rate',
    label: 'Annual Interest Rate (%)',
    type: 'number',
    min: 0,
    step: 0.01,
  },
  {
    key: 'timesCompounded',
    label: 'Times Compounded Per Year',
    type: 'number',
    min: 1,
    max: 365,
  },
  { key: 'years', label: 'Years', type: 'number', min: 1, max: 100 },
  {
    key: 'monthlyAddition',
    label: 'Monthly Addition (£)',
    type: 'number',
    min: 0,
    step: 0.01,
  },
];

const initialValues = {
  principal: 0,
  rate: 0,
  timesCompounded: 1,
  years: 0,
  monthlyAddition: 0,
};

export const CompoundInterestCalculator = () => (
  <Calculator
    title="Compound Interest Calculator"
    fields={fields}
    initialValues={initialValues}
    calculate={calculateCompoundInterest}
    resultLabel={(result) =>
      `Future Value: £${result.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    }
  />
);
