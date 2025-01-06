import { AppState } from '@Context';
import { Service } from './types';

export const mockServices: Service[] = [
  {
    id: 'service-1',
    label: 'Service 1',
    path: '/service-1',
    subServices: [
      {
        id: 'shop',
        label: 'Shop',
        path: '/shop',
        subServices: [
          {
            id: 'latest',
            label: 'Latest',
            path: '/latest',
          },
          {
            id: 'popular',
            label: 'Popular',
            path: '/popular',
          },
          {
            id: 'sale',
            label: 'Sale',
            path: '/sale',
          },
          {
            id: 'new',
            label: 'New',
            path: '/new',
          },
        ],
      },
      {
        id: 'quick-links',
        label: 'Quick Links',
        path: '/quick-links',
        subServices: [
          {
            id: 'home',
            label: 'Home',
            path: '/home',
          },
          {
            id: 'shop',
            label: 'Shop',
            path: '/shop',
          },
          {
            id: 'about',
            label: 'About',
            path: '/about',
          },
          {
            id: 'financing',
            label: 'Financing',
            path: '/financing',
          },
        ],
      },
      {
        id: 'support',
        label: 'Support',
        path: '/support',
        subServices: [
          {
            id: 'contact',
            label: 'Contact',
            path: '/contact',
          },
        ],
      },
    ],
  },
  {
    id: 'service-2',
    label: 'Service 2',
    path: '/service-2',
    subServices: [
      {
        id: 'sub-service-3',
        label: 'Sub Service 3',
        path: '/sub-service-3',
        subServices: [],
      },
    ],
  },
  {
    id: 'service-3',
    label: 'Service 3',
    path: '/service-3',
    subServices: [],
  },
  {
    id: 'service-4',
    label: 'Service 4',
    icon: 'icon-4',
    path: '/service-4',
    subServices: [
      {
        id: 'sub-service-4',
        label: 'Sub Service 4',
        path: '/sub-service-4',
        subServices: [],
      },
      {
        id: 'sub-service-5',
        label: 'Sub Service 5',
        path: '/sub-service-5',
        subServices: [],
      },
      {
        id: 'sub-service-6',
        label: 'Sub Service 6',
        path: '/sub-service-6',
        subServices: [],
      },
    ],
  },
  {
    id: 'service-5',
    label: 'Service 5',
    path: '/service-5',
    subServices: [
      {
        id: 'sub-service-7',
        label: 'Sub Service 7',
        path: '/sub-service-7',
        subServices: [],
      },
    ],
  },
  {
    id: 'service-6',
    label: 'Service 6',
    icon: 'icon-6',
    path: '/service-6',
    subServices: [],
  },
  {
    id: 'service-7',
    label: 'Service 7',
    path: '/service-7',
    subServices: [
      {
        id: 'sub-service-8',
        label: 'Sub Service 8',
        path: '/sub-service-8',
        subServices: [],
      },
      {
        id: 'sub-service-9',
        label: 'Sub Service 9',
        path: '/sub-service-9',
        subServices: [],
      },
    ],
  },
  {
    id: 'service-8',
    label: 'Service 8',
    path: '/service-8',
    subServices: [],
  },
  {
    id: 'service-9',
    label: 'Service 9',
    icon: 'icon-9',
    path: '/service-9',
    subServices: [
      {
        id: 'mortgage-calculator',
        label: 'Mortgage Calculator',
        path: '/mortgage-calculator',
        subServices: [],
      },
    ],
  },
  {
    id: 'bag-10',
    icon: 'bag-icon-10',
    path: '/bag-10',
    subServices: [
      {
        id: 'sub-service-11',
        label: 'Sub Service 11',
        path: '/sub-service-11',
        subServices: [],
      },
      {
        id: 'sub-service-12',
        label: 'Sub Service 12',
        path: '/sub-service-12',
        subServices: [],
      },
    ],
  },
  {
    id: 'service-11',
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
