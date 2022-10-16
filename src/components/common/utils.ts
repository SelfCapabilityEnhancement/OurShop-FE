import { http } from '@/service';
import { User } from '@/components/common/CustomeTypes';

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

// this will be replaced by useContext in next iteration
export const getCurrentUser = (): Promise<User[]> => {
  return http.get('/user/allUsers').then((response) => response.data);
};
