import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './header';

describe('<Header />', () => {
  test('renders correctly', () => {
    render(
      <Router>
        <Header />
      </Router>,
    );
    expect(screen.getByText('AHORA')).toBeInTheDocument();
  });
});
