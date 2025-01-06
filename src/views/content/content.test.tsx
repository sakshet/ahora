import { useAppState } from '@Context';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Content } from './content';

describe('Content', () => {
  test('renders Homepage by default', () => {
    (useAppState as jest.Mock).mockReturnValue({ state: { activeTab: null } });
    render(<Content />);
    expect(screen.getByText('Homepage')).toBeInTheDocument();
  });

  test('renders About when activeTab is About', () => {
    (useAppState as jest.Mock).mockReturnValue({
      state: { activeTab: 'About' },
    });
    render(<Content />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('renders Login when activeTab is Login', () => {
    (useAppState as jest.Mock).mockReturnValue({
      state: { activeTab: 'Login' },
    });
    render(<Content />);
    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
