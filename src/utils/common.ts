import { MortgageInput } from './types';

export const calculateMortgage = (input: MortgageInput): number | null => {
  const principal: number = input.price - input.deposit;
  const interestRate = input.interest / 100 / 12;
  const n: number = input.years * 12;

  if (principal <= 0 || input.years <= 0 || input.interest <= 0) return null;
  return (
    (principal * interestRate * Math.pow(1 + interestRate, n)) /
    (Math.pow(1 + interestRate, n) - 1)
  );
};
