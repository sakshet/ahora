// /** @jsx React.createElement */

import '@testing-library/jest-dom';
import React from 'react';
import { useServicesData } from '@Context';
import { mockServices } from '@Utils/mocks';

jest.mock('@Context', () => ({
  useAppState: jest.fn(),
  useServicesData: jest.fn(),
  AppStateProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  ServerStateProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

beforeEach(() => {
  (useServicesData as jest.Mock).mockReturnValue({ options: mockServices });
});

// Suppress act warnings
const originalError = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('Warning: An update to')) {
    return;
  }
  originalError.call(console, ...args);
};