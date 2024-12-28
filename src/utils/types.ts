export type Service = {
  icon?: string;
  iconType?: 'outlined' | 'filled';
  label?: string;
  path: string;
  subServices?: Service[];
};
