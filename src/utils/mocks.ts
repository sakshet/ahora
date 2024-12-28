import { AppState } from '@Context';
import { Service } from './types';

export const mockServices: Service[] = [
  {
    label: 'Service 1',
    path: '/service-1',
    subServices: [
      {
        label: 'Sub Service 1',
        path: '/sub-service-1',
        subServices: [],
      },
      {
        label: 'Sub Service 2',
        path: '/sub-service-2',
        subServices: [],
      },
    ],
  },
  {
    label: 'Service 2',
    path: '/service-2',
    subServices: [
      {
        label: 'Sub Service 3',
        path: '/sub-service-3',
        subServices: [],
      },
    ],
  },
  {
    label: 'Service 3',
    path: '/service-3',
    subServices: [],
  },
  {
    label: 'Service 4',
    icon: 'icon-4',
    path: '/service-4',
    subServices: [
      {
        label: 'Sub Service 4',
        path: '/sub-service-4',
        subServices: [],
      },
      {
        label: 'Sub Service 5',
        path: '/sub-service-5',
        subServices: [],
      },
      {
        label: 'Sub Service 6',
        path: '/sub-service-6',
        subServices: [],
      },
    ],
  },
  {
    label: 'Service 5',
    path: '/service-5',
    subServices: [
      {
        label: 'Sub Service 7',
        path: '/sub-service-7',
        subServices: [],
      },
    ],
  },
  {
    label: 'Service 6',
    icon: 'icon-6',
    path: '/service-6',
    subServices: [],
  },
  {
    label: 'Service 7',
    path: '/service-7',
    subServices: [
      {
        label: 'Sub Service 8',
        path: '/sub-service-8',
        subServices: [],
      },
      {
        label: 'Sub Service 9',
        path: '/sub-service-9',
        subServices: [],
      },
    ],
  },
  {
    label: 'Service 8',
    path: '/service-8',
    subServices: [],
  },
  {
    label: 'Service 9',
    icon: 'icon-9',
    path: '/service-9',
    subServices: [
      {
        label: 'Sub Service 10',
        path: '/sub-service-10',
        subServices: [],
      },
    ],
  },
  {
    icon: 'bag-icon-10',
    path: '/bag-10',
    subServices: [
      {
        label: 'Sub Service 11',
        path: '/sub-service-11',
        subServices: [],
      },
      {
        label: 'Sub Service 12',
        path: '/sub-service-12',
        subServices: [],
      },
    ],
  },
  {
    icon: 'search-icon-11',
    path: '/service-11',
    subServices: [],
  },
];

export const defaultAppState: AppState = {
  activeTab: null,
  alertBanner: null,
  fetching: false,
  useMockData: true,
};
