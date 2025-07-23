export type CalculatorField = {
  key: string;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
};

export type CompoundInput = {
  principal: number;
  rate: number;
  timesCompounded: number;
  years: number;
  monthlyAddition: number;
};

export type MortgageInput = {
  deposit: number;
  interest: number;
  price: number;
  years: number;
};

export type Service = {
  hoverDisabled?: boolean;
  icon?: string;
  iconType?: 'outlined' | 'filled';
  id: string;
  label?: string;
  onClick?: () => void;
  path?: string;
  subServices?: Service[];
};
