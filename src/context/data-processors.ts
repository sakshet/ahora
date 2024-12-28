import { Service } from '@Utils/types';
import { useEffect, useState } from 'react';
import { useServerState } from './context';

export const useServicesData = (): Service[] => {
  const [services, setServices] = useState<Service[]>([]);
  const data = useServerState();

  useEffect(() => {
    setServices([
      { icon: 'home', path: '', iconType: 'filled' },
      ...data.services,
      { icon: 'search', path: '/search', iconType: 'outlined' },
      { icon: 'bag', path: '/bag', iconType: 'outlined' },
    ]);
  }, [data]);

  return services;
};
