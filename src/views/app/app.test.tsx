import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { App } from './app';

const renderComponent = (path: string = '/') => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
};

describe('<App />', () => {
  test('renders correctly', () => {
    renderComponent();

    // Check if the Header is rendered
    expect(screen.getByText('AHORA')).toBeInTheDocument();
  });

  test('renders correct routes', () => {
    renderComponent('/about');

    // Check if the Homepage component is rendered for /about route
    expect(screen.getByText('All good things take time')).toBeInTheDocument();
  });

  test('redirects to base path for unknown routes', () => {
    renderComponent('/unknown');

    // Check if the Homepage component is rendered for unknown route
    expect(screen.getByText('All good things take time')).toBeInTheDocument();
  });

  test('navigates to redirect path', async () => {
    renderComponent('/?redirect=/about');

    // Wait for the navigation to occur
    await waitFor(() => {
      expect(screen.getByText('All good things take time')).toBeInTheDocument();
    });
  });
});
