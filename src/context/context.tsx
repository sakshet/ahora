import React, { createContext, ReactNode, useContext, useEffect, useReducer, useState } from 'react';

// The context object itself
const AppContext = createContext<{ state: AppState; dispatch: Dispatch } | undefined>(
  undefined,
);

// Don't leak the context itself, provide a mechanism for accessing it
export const useAppState = () => {
  const state = useContext(AppContext);
  if(!state) {
    throw new Error('useAppState must be used within a Provider');
  } else {
    return state;
  }
};

// Provider shorthand
export const AppStateProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(appReducer, {
    alertBanner: null,
  });
  return <AppContext.Provider value = {{ dispatch, state }}>{children}</AppContext.Provider>;
};

declare const statuses: readonly ["none", "information", "success", "warning", "error", "loading"];
declare type Status = typeof statuses[number];
type AlertStatus = Extract<Status, 'none' | 'information' | 'success' | 'warning' | 'error'>;

type AlertBannerState = {
  status: AlertStatus;
  title: string;
  message?: string;
};

export type AppState = {
  alertBanner: AlertBannerState | null;
};

export type Dispatch = (action: AppAction) => void;
export type ServerState = { };
const ServerStateContext = createContext<ServerState | undefined>(undefined);

// Don't leak the context itself, provide a mechanism for accessing it
export const useServerState = () => {
  const state = useContext(ServerStateContext);
  if(!state) {
    throw new Error('useServerState must be used within a Provider');
  } else {
    return state;
  }
};

// Provider shorthand
export const ServerStateProvider = ({ children }: { children: ReactNode; }) => {
  const [data, setData] = useState<ServerState | undefined>();
  const { dispatch, state } = useAppState();

  useEffect(() => {
    // API calls on load
  }, []);

  return (
    <div style={{height: '100%', width: '100%'}}>
      <ServerStateContext.Provider value={data}>{children}</ServerStateContext.Provider>
    </div>
  );
};

type AlertBannerBase = {
  payload: Omit<AlertBannerState, 'status'>;
}

// action types
type APIErrorAction = {
  type: 'API_ERROR';
} & AlertBannerBase;

type AlertClearAction = {
  type: 'ALERT_CLEAR';
};

type APISuccessAction = {
  type: 'API_SUCCESS';
} & AlertBannerBase;

// union of actions available to dispatch
export type AppAction =
  | AlertClearAction
  | APIErrorAction
  | APISuccessAction;

// reducer for the app
export function appReducer(state: AppState, action: AppAction): AppState {
  switch(action.type) {
    case 'API_ERROR':
      return {
        ...state,
        alertBanner: { ...action.payload, status: 'error' },
      };
    case 'API_SUCCESS':
      return {
        ...state,
        alertBanner: { ...action.payload, status: 'success' },
      };
    case 'ALERT_CLEAR':
      return { ...state, alertBanner: null };
    default:
      return state;
  }
}