import moment from 'moment';

export const generateUniqueImageName = (name: string) => {
  return `${name.replace(/\.png/, '')}-${moment().unix()}.png`;
};

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}
