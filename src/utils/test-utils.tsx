import { AppStateProvider, ServerStateProvider } from '@Context';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement, ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

interface ProvidersProps {
  children: ReactNode;
}

const AllProviders: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <AppStateProvider useMockData={true}>
      <ServerStateProvider>
        <Router>{children}</Router>
      </ServerStateProvider>
    </AppStateProvider>
  );
};

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {}

const renderWithProviders = (
  ui: ReactElement,
  options?: CustomRenderOptions,
) => {
  return render(ui, {
    wrapper: AllProviders,
    ...options,
  });
};

export { renderWithProviders };
