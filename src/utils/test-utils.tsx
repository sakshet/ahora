import { AppStateProvider, ServerStateProvider } from '@Context';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

export const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <AppStateProvider>
      <ServerStateProvider>
        <MemoryRouter initialEntries={['/']}>{ui}</MemoryRouter>
      </ServerStateProvider>
    </AppStateProvider>,
  );
};
