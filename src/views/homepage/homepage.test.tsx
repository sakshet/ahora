import { render, screen } from '@testing-library/react';
import React from 'react';
import { Homepage } from './homepage';

describe('Homepage', () => {
  test('renders Homepage component with tiles', () => {
    render(<Homepage />);

    // Check if the main titles are rendered
    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Title 2')).toBeInTheDocument();
    expect(screen.getByText('Title 5')).toBeInTheDocument();
  });
});
