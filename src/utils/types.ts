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

export type MortgageInput = {
  deposit: number;
  interest: number;
  price: number;
  years: number;
};
