export type Service = {
  icon?: string;
  iconType?: 'outlined' | 'filled';
  label?: string;
  onClick?: () => void;
  path: string;
  subServices?: Service[];
};
