import { Dispatch } from '@Context';
import { mockServices } from '@Utils/mocks';
import { Service } from '@Utils/types';

export const getServices = async (
  useMockData: boolean,
  dispatch: Dispatch,
): Promise<Service[]> => {
  const result: Service[] = useMockData ? mockServices : mockServices;
  dispatch({ type: 'FETCH_DATA_SUCCESS' });
  return result;
};
