export const APP_NAME = 'Ahora';

export enum Tab {
  ABOUT = 'About',
  LOGIN = 'Log In / Sign Up',
}

export const tabUrls: { [key in Tab]: string } = {
  [Tab.ABOUT]: '/about',
  [Tab.LOGIN]: '/login',
};