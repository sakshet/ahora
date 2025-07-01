import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './header';

describe('<Header />', () => {
  test('renders correctly', () => {
    render(<MemoryRouter initialEntries={['/']}><Header /></MemoryRouter>);
    
    expect(screen.getByText('AHORA')).toBeInTheDocument();
  });
});

// import { renderWithProviders } from '@Utils/test-utils';
// import { screen, fireEvent, waitFor } from '@testing-library/react';
// import React from 'react';
// import { Header } from './header';

// describe('Header', () => {
//   beforeEach(() => {
//     // Mock window.innerWidth
//     Object.defineProperty(window, 'innerWidth', {
//       writable: true,
//       configurable: true,
//       value: 1024,
//     });
//   });

//   test('renders header with options', () => {
//     renderWithProviders(<Header />);
//     expect(screen.getByText('Service 1')).toBeInTheDocument();
//     expect(screen.getByText('Service 2')).toBeInTheDocument();
//   });

//   test('shows sub-menu on hover', async () => {
//     renderWithProviders(<Header />);
//     const service1 = screen.getByText('Service 1');
//     fireEvent.mouseEnter(service1);
//     await waitFor(() => expect(screen.getByText('Shop')).toBeInTheDocument());
//   });

//   test('hides sub-menu on mouse leave', async () => {
//     renderWithProviders(<Header />);
//     const service1 = screen.getByText('Service 1');
//     fireEvent.mouseEnter(service1);
//     await waitFor(() => expect(screen.getByText('Shop')).toBeInTheDocument());
//     fireEvent.mouseLeave(service1);
//     await waitFor(() =>
//       expect(screen.queryByText('Shop')).not.toBeInTheDocument(),
//     );
//   });

//   test('resizes window and updates width', () => {
//     renderWithProviders(<Header />);
//     global.innerWidth = 500;
//     global.dispatchEvent(new Event('resize'));
//     expect(screen.getByText('Service 1')).toBeInTheDocument();
//   });
// });
