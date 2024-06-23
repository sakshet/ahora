import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppStateProvider, useAppState, appReducer, AppState, Dispatch, AppAction } from './context';

// Mock child component to test the context
const MockChild = () => {
  const { state, dispatch } = useAppState();
  return (
    <div>
      {state.alertBanner ? (
        <div data-testid="alert-banner">
          {state.alertBanner.title}
        </div>
      ) : (
        <div data-testid="no-alert">No Alert</div>
      )}
      <button
        data-testid="success-button"
        onClick={() => dispatch({ type: 'API_SUCCESS', payload: { title: 'Success!', message: 'Operation was successful.' } })}
      >
        Trigger Success
      </button>
    </div>
  );
};

// Utility function to render the provider with children
const renderWithProviders = (ui: React.ReactNode) => {
  return render(<AppStateProvider>{ui}</AppStateProvider>);
};

describe('AppStateProvider', () => {
  it('renders without crashing and displays no alert by default', () => {
    renderWithProviders(<MockChild />);
    expect(screen.getByTestId('no-alert')).toBeInTheDocument();
  });
});

describe('appReducer', () => {
  it('returns the initial state', () => {
    const initialState: AppState = { alertBanner: null };
    expect(appReducer(initialState, { type: 'ALERT_CLEAR' })).toEqual(initialState);
  });

  it('handles API_SUCCESS action', () => {
    const initialState: AppState = { alertBanner: null };
    const action: AppAction = { type: 'API_SUCCESS', payload: { title: 'Success!', message: 'Operation was successful.' } };
    const expectedState: AppState = {
      alertBanner: { title: 'Success!', message: 'Operation was successful.', status: 'success' },
    };
    expect(appReducer(initialState, action)).toEqual(expectedState);
  });

  it('handles API_ERROR action', () => {
    const initialState: AppState = { alertBanner: null };
    const action: AppAction = { type: 'API_ERROR', payload: { title: 'Error!', message: 'Operation failed.' } };
    const expectedState: AppState = {
      alertBanner: { title: 'Error!', message: 'Operation failed.', status: 'error' },
    };
    expect(appReducer(initialState, action)).toEqual(expectedState);
  });

  it('handles ALERT_CLEAR action', () => {
    const initialState: AppState = { alertBanner: { title: 'Error!', message: 'Operation failed.', status: 'error' } };
    const action: AppAction = { type: 'ALERT_CLEAR' };
    const expectedState: AppState = { alertBanner: null };
    expect(appReducer(initialState, action)).toEqual(expectedState);
  });
});
