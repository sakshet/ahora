import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import { App } from './app';

describe('<App />', () => {
  test('renders correctly', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Check if the Header is rendered
    expect(screen.getByText('AHORA')).toBeInTheDocument();
  });

  test('renders correct routes', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    // Check if the Homepage component is rendered for /about route
    expect(screen.getByText('All good things take time')).toBeInTheDocument();
  });

  test('redirects to base path for unknown routes', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <App />
      </MemoryRouter>
    );

    // Check if the Homepage component is rendered for unknown route
    expect(screen.getByText('All good things take time')).toBeInTheDocument();
  });
});