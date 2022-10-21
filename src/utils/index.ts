import moment from 'moment';
import { uploadProduct, User } from '@/components/common/CustomeTypes';
import { http } from '@/service';

export const generateUniqueImageName = (name: string) => {
  return `${name.replace(/\.png/, '')}-${moment().unix()}.png`;
};

export function classNames(...classes: any): string {
  return classes.filter(Boolean).join(' ');
}

// this will be replaced by useContext in next iteration
export const getCurrentUser = (): Promise<User[]> => {
  return http.get('/user/getById/13').then((response) => [response.data]);
};

export const validateForm = (obj: uploadProduct, exclude: string[] = []) => {
  const result: any = {};
  for (const [key, value] of Object.entries(obj)) {
    if (!exclude.includes(key)) {
      if (typeof value === 'number' && value <= 0) {
        result[key] = true;
      } else result[key] = value.length <= 0;
    } else {
      result[key] = false;
    }
  }
  return result;
};
