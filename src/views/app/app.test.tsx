import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AppContainer } from './app';

describe('App', () => {
  it('renders the header', () => {
    render(
      <MemoryRouter>
        <AppContainer />
      </MemoryRouter>,
    );
    expect(screen.getByText('AHORA')).toBeInTheDocument();
  });

  it('renders the welcome route by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppContainer />
      </MemoryRouter>,
    );
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });

  it('renders the about route', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AppContainer />
      </MemoryRouter>,
    );
    expect(screen.queryAllByText('About').length).toBe(2);
  });

  it('renders the mortgage calculator route', () => {
    render(
      <MemoryRouter initialEntries={['/mortgage-calculator']}>
        <AppContainer />
      </MemoryRouter>,
    );
    expect(screen.queryAllByText('Mortgage Calculator').length).toBe(2);
  });

  it('redirects unknown routes to home', () => {
    render(
      <MemoryRouter initialEntries={['/unknown']}>
        <AppContainer />
      </MemoryRouter>,
    );
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });
});
