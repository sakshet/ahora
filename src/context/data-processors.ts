import { formerOptions, latterOptions } from '@Utils/constants';
import { Service } from '@Utils/types';
import { useEffect, useState } from 'react';
import { useServerState } from './context';

export const useServicesData = (): {
  enhancedOptions: Service[];
  options: Service[];
} => {
  const [services, setServices] = useState<Service[]>([]);
  const data = useServerState();

  useEffect(() => {
    setServices([...formerOptions, ...data.services, ...latterOptions]);
  }, [data]);

  return {
    enhancedOptions: services,
    options: data.services,
  };
};
