import { render, screen } from '@testing-library/react';
import React from 'react';
import {
  useAppState,
  ServerStateProvider,
  useServerState,
  appReducer,
  AppState,
  AppAction,
} from './context';

// Mock components to test the providers and hooks
const MockAppStateComponent = () => {
  const { state, dispatch } = useAppState();
  return (
    <div>
      <div data-testid="alertBanner">{state.alertBanner?.title}</div>
      <button
        onClick={() =>
          dispatch({ type: 'API_SUCCESS', payload: { title: 'Success' } })
        }
      >
        Trigger Success
      </button>
    </div>
  );
};

const MockServerStateComponent = () => {
  const state = useServerState();
  return <div data-testid="serverState">{JSON.stringify(state)}</div>;
};

describe('AppStateProvider and useAppState', () => {
  test('throws error when used outside of provider', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    expect(() => render(<MockAppStateComponent />)).toThrow(
      'useAppState must be used within a Provider',
    );
    consoleError.mockRestore();
  });
});

describe('ServerStateProvider and useServerState', () => {
  test('renders correctly and provides state', () => {
    render(
      <ServerStateProvider>
        <MockServerStateComponent />
      </ServerStateProvider>,
    );

    // Check if the initial state is rendered correctly
    expect(screen.getByTestId('serverState')).toHaveTextContent('{}');
  });

  test('throws error when used outside of provider', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<MockServerStateComponent />)).toThrow(
      'useServerState must be used within a Provider',
    );

    consoleError.mockRestore();
  });
});

describe('appReducer', () => {
  const initialState: AppState = {
    activeTab: null,
    alertBanner: null,
  };

  test('handles API_ERROR action', () => {
    const action: AppAction = {
      type: 'API_ERROR',
      payload: { title: 'Error' },
    };
    const newState = appReducer(initialState, action);
    expect(newState.alertBanner).toEqual({ title: 'Error', status: 'error' });
  });

  test('handles API_SUCCESS action', () => {
    const action: AppAction = {
      type: 'API_SUCCESS',
      payload: { title: 'Success' },
    };
    const newState = appReducer(initialState, action);
    expect(newState.alertBanner).toEqual({
      title: 'Success',
      status: 'success',
    });
  });

  test('handles ALERT_CLEAR action', () => {
    const action: AppAction = { type: 'ALERT_CLEAR' };
    const newState = appReducer(
      {
        activeTab: null,
        alertBanner: { title: 'Error', status: 'error' },
      },
      action,
    );
    expect(newState.alertBanner).toBeNull();
  });

  test('returns current state for unknown action', () => {
    const action = { type: 'UNKNOWN_ACTION' } as unknown as AppAction;
    const newState = appReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
