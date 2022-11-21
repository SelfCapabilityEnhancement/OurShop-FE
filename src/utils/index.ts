import moment from 'moment';
import { Product } from '@/components/common/CustomTypes';

export const generateUniqueImageName = (name: string) => {
  return `${name.replace(/\.png/, '')}-${moment().unix()}.png`;
};

export function classNames(...classes: any): string {
  return classes.filter(Boolean).join(' ');
}

export const validateForm = (obj: Product, exclude: string[] = []) => {
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

export const preventScrollBug = () => {
  // prevent scroll bug
  // https://github.com/tailwindlabs/headlessui/issues/1698
  const HTMLDOM = document.querySelector('html');

  if (HTMLDOM) {
    // https://stackoverflow.com/a/67384208/6236633
    HTMLDOM.setAttribute('style', '');
  }
};
