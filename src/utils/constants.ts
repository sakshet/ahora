import { Service } from './types';

export const APP_NAME = 'Ahora';

export const MIN_SIZE_FOR_DESKTOP = 1250;
export const MIN_SIZE_FOR_SMALL_SCREEN = 650;

export const formerOptions: Service[] = [
  { icon: 'home', id: 'home', path: '', iconType: 'filled' },
];

export const latterOptions: Service[] = [
  { icon: 'search', id: 'search', iconType: 'outlined' },
  { icon: 'bag', id: 'bag', iconType: 'outlined' },
];

export const dragOption: Service = {
  hoverDisabled: true,
  icon: 'drag_handle',
  iconType: 'filled',
  id: 'drag',
  path: '',
};

export const getDragOption = (onClick: () => void): Service => ({
  hoverDisabled: true,
  icon: 'drag_handle',
  iconType: 'filled',
  id: 'drag',
  onClick,
  path: '',
});
