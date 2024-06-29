import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './header';

// Mocking the Link component from @Core/link
jest.mock('@Core/link', () => ({
  Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
    <a href={to}>{children}</a>
  ),
}));

describe('<Header />', () => {
  test('renders header with navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    // Check if "AHORA" heading is rendered
    expect(screen.getByText('AHORA')).toBeInTheDocument();

    // Check if navigation links are rendered with correct text and to prop
    const aboutLink = screen.getByText('About Us');
    const loginLink = screen.getByText('Login / Sign Up');

    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute('href', '/about');

    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});
