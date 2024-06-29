import { render, screen } from '@testing-library/react';
import React from 'react';
import { App } from './app';

// Mocking the Homepage component
jest.mock('@Views/homepage', () => ({
  Homepage: () => <div>Homepage</div>,
}));

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Homepage')).toBeInTheDocument();
  });
});
