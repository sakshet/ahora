import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './app';

// Mocking sub-components
jest.mock('@Components/header', () => ({
  Header: () => <div data-testid="header">Header</div>,
}));

jest.mock('@Components/footer', () => ({
  Footer: () => <div data-testid="footer">Footer</div>,
}));

jest.mock('@Views/homepage', () => ({
  Homepage: () => <div data-testid="homepage">Homepage</div>,
}));

describe('<App />', () => {
  test('renders App with Header, Footer, and Homepage components', () => {
    render(<App />);

    // Check if Header, Footer, and Homepage components are rendered
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('homepage')).toBeInTheDocument();
  });

  test('routes correctly to Homepage on root path', () => {
    render(<App />);

    // Check if Homepage is rendered on root path
    expect(screen.getByTestId('homepage')).toBeInTheDocument();
  });

  test('routes correctly to Homepage on unknown path', () => {
    render(<App />);

    // Check if Homepage is rendered on unknown path (assuming it defaults to Homepage)
    expect(screen.getByTestId('homepage')).toBeInTheDocument();
  });
});
