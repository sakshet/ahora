import { CompoundInput, MortgageInput } from './types';

export const calculateCompoundInterest = ({
  principal,
  rate,
  timesCompounded,
  years,
  monthlyAddition,
}: CompoundInput): number | null => {
  if (
    principal < 0 ||
    rate < 0 ||
    timesCompounded <= 0 ||
    years <= 0 ||
    monthlyAddition < 0
  )
    return null;
  const r = rate / 100;
  const n = timesCompounded;
  const t = years;
  const P = principal;
  const M = monthlyAddition;

  // Compound principal
  let futureValue = P * Math.pow(1 + r / n, n * t);

  // Compound monthly additions
  if (M > 0) {
    // Each year has 12 months, so total periods = years * 12
    const totalMonths = t * 12;
    const monthlyRate = Math.pow(1 + r / n, n / 12) - 1;
    for (let m = 1; m <= totalMonths; m++) {
      futureValue += M * Math.pow(1 + monthlyRate, totalMonths - m);
    }
  }

  return futureValue;
};

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
