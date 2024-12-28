import { getServices } from '@Api';
import { Service } from '@Utils/types';
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

// The context object itself
const AppContext = createContext<
  { state: AppState; dispatch: Dispatch } | undefined
>(undefined);

// Don't leak the context itself, provide a mechanism for accessing it
export const useAppState = () => {
  const state = useContext(AppContext);
  if (!state) {
    throw new Error('useAppState must be used within a Provider');
  } else {
    return state;
  }
};

// Provider shorthand
export const AppStateProvider = ({
  children,
  useMockData,
}: {
  children: ReactNode;
  useMockData?: boolean;
}) => {
  const [state, dispatch] = useReducer(appReducer, {
    activeTab: null,
    alertBanner: null,
    fetching: true,
    useMockData: useMockData || true,
  });
  return (
    <AppContext.Provider value={{ dispatch, state }}>
      {children}
    </AppContext.Provider>
  );
};

declare const statuses: readonly [
  'none',
  'information',
  'success',
  'warning',
  'error',
  'loading',
];
declare type Status = (typeof statuses)[number];
type AlertStatus = Extract<
  Status,
  'none' | 'information' | 'success' | 'warning' | 'error'
>;

type AlertBannerState = {
  status: AlertStatus;
  title: string;
  message?: string;
};

export type AppState = {
  activeTab: string | null;
  alertBanner: AlertBannerState | null;
  fetching: boolean;
  useMockData: boolean;
};

export type Dispatch = (action: AppAction) => void;
export type ServerState = {
  services: Service[];
};
const ServerStateContext = createContext<ServerState | undefined>(undefined);

// Don't leak the context itself, provide a mechanism for accessing it
export const useServerState = () => {
  const state = useContext(ServerStateContext);
  if (!state) {
    throw new Error('useServerState must be used within a Provider');
  } else {
    return state;
  }
};

// Provider shorthand
export const ServerStateProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ServerState | undefined>();
  const { dispatch, state } = useAppState();

  useEffect(() => {
    const fetchData = async () => {
      const services: Service[] = await getServices(
        state.useMockData,
        dispatch,
      );
      setData({ services });
    };

    if (state.fetching) {
      fetchData();
    }
  }, [state.fetching]);

  return data ? (
    <ServerStateContext.Provider value={data}>
      {children}
    </ServerStateContext.Provider>
  ) : null;
};

type AlertBannerBase = {
  payload: Omit<AlertBannerState, 'status'>;
};

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

type FetchDataAction = {
  type: 'FETCH_DATA';
};

type FetchDataSuccessAction = {
  type: 'FETCH_DATA_SUCCESS';
};

type SetActiveTabAction = {
  type: 'SET_ACTIVE_TAB';
  activeTab: string | null;
};

// union of actions available to dispatch
export type AppAction =
  | AlertClearAction
  | APIErrorAction
  | APISuccessAction
  | FetchDataAction
  | FetchDataSuccessAction
  | SetActiveTabAction;

// reducer for the app
export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
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
    case 'FETCH_DATA':
      return { ...state, fetching: true };
    case 'FETCH_DATA_SUCCESS': {
      return { ...state, fetching: false };
    }
    case 'SET_ACTIVE_TAB':
      return { ...state, ...action };
    default:
      return state;
  }
}
