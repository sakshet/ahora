import { Service } from './types';

export const APP_NAME = 'Ahora';

export const MIN_SIZE_FOR_DESKTOP = 1250;
export const MIN_SIZE_FOR_SMALL_SCREEN = 650;

export const formerOptions: Service[] = [
  { icon: 'home', path: '', iconType: 'filled' },
];

export const latterOptions: Service[] = [
  { icon: 'search', path: '/search', iconType: 'outlined' },
  { icon: 'bag', path: '/bag', iconType: 'outlined' },
];

export const getDragOption = (onClick: () => void): Service => ({
  icon: 'drag_handle',
  path: '',
  iconType: 'filled',
  onClick,
});
