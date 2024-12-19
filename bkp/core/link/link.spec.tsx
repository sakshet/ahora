import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Link } from './link';

describe('<Link />', () => {
  test('passes the "to" prop correctly to RouterLink', () => {
    render(
      <MemoryRouter>
        <Link to="/example">Link Text</Link>
      </MemoryRouter>,
    );

    const linkElement = screen.getByText('Link Text');
    expect(linkElement).toHaveAttribute('href', '/example');
  });
});
