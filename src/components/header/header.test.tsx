import { colors } from '@Core/colors';
import { APP_NAME, Tab, tabUrls } from '@Utils/constants';
import { render, screen, fireEvent } from '@testing-library/react';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Header } from './header';

describe('<Header />', () => {
  beforeEach(() => {
    render(
      <Router>
        <Header />
      </Router>,
    );
  });

  test('renders correctly', () => {
    // Check if the app name is rendered
    expect(screen.getByText(APP_NAME.toUpperCase())).toBeInTheDocument();

    // Check if all tabs are rendered with correct text
    Object.values(Tab).forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('links have correct URLs', () => {
    // Check if all links have correct URLs
    Object.values(Tab).forEach((label) => {
      const link = screen.getByText(label).closest('a');
      expect(link).toHaveAttribute('href', tabUrls[label]);
    });
  });

  test('active tab state changes on click', () => {
    // Click on each tab and check if it becomes active
    Object.values(Tab).forEach((label) => {
      const link = screen.getByText(label);
      fireEvent.click(link);
      expect(link.closest('a')).toHaveStyle(
        `border-bottom: 5px solid ${colors.gray080}`,
      );
    });

    // Check if the active tab state changes correctly
    const firstTab = screen.getByText(Object.values(Tab)[0]);
    fireEvent.click(firstTab);
    expect(firstTab.closest('a')).toHaveStyle(
      `border-bottom: 5px solid ${colors.gray080}`,
    );

    const secondTab = screen.getByText(Object.values(Tab)[1]);
    fireEvent.click(secondTab);
    expect(secondTab.closest('a')).toHaveStyle(
      `border-bottom: 5px solid ${colors.gray080}`,
    );
    expect(firstTab.closest('a')).not.toHaveStyle(
      `border-bottom: 5px solid ${colors.gray080}`,
    );
  });

  test('resets active tab state when app name is clicked', () => {
    // Click on a tab to set it as active
    const firstTab = screen.getByText(Object.values(Tab)[0]);
    fireEvent.click(firstTab);
    expect(firstTab.closest('a')).toHaveStyle(
      `border-bottom: 5px solid ${colors.gray080}`,
    );

    // Click on the app name to reset the active tab state
    const appName = screen.getByText(APP_NAME.toUpperCase());
    fireEvent.click(appName);
    expect(firstTab.closest('a')).not.toHaveStyle(
      `border-bottom: 5px solid ${colors.gray080}`,
    );
  });
});
