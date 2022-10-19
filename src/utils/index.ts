import moment from 'moment';
import { User } from '@/components/common/CustomeTypes';
import { http } from '@/service';

export const generateUniqueImageName = (name: string) => {
  return `${name.replace(/\.png/, '')}-${moment().unix()}.png`;
};

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

// this will be replaced by useContext in next iteration
export const getCurrentUser = (): Promise<User[]> => {
  return http.get('/user/getById/13').then((response) => [response.data]);
};
