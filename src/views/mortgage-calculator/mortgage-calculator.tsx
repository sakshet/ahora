import { calculateMortgage } from '@Utils/common';
import { Calculator } from '@Views/calculator';
import React from 'react';

const fields = [
  { key: 'price', label: 'Property Price (£)', type: 'number', min: 0 },
  { key: 'deposit', label: 'Deposit (£)', type: 'number', min: 0 },
  {
    key: 'interest',
    label: 'Annual Interest Rate (%)',
    type: 'number',
    min: 0,
    step: 0.01,
  },
  { key: 'years', label: 'Years', type: 'number', min: 1, max: 40 },
];

const initialValues = {
  price: 0,
  deposit: 0,
  interest: 0,
  years: 0,
};

export const MortgageCalculator = () => (
  <Calculator
    title="Mortgage Calculator"
    fields={fields}
    initialValues={initialValues}
    calculate={calculateMortgage}
    resultLabel={(result) => `Estimated Monthly Payment: £${result.toFixed(2)}`}
  />
);
