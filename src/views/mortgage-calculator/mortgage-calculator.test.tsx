import { render, screen } from '@testing-library/react';
import React from 'react';
import { MortgageCalculator } from './mortgage-calculator';

describe('<MortgageCalculator />', () => {
  test('renders correctly', () => {
    render(<MortgageCalculator />);
    expect(screen.getByText('Mortgage Calculator')).toBeInTheDocument();
  });
});