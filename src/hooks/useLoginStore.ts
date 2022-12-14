import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface ILoginState {
  jwt: string;
  accessiblePaths: string[];
  setJwt: (token: string) => void;
  setAccessiblePaths: (val: string[]) => void;
  clear: () => void;
}

function defaultState(): Pick<ILoginState, 'jwt' | 'accessiblePaths'> {
  return {
    jwt: '',
    accessiblePaths: [],
  };
}

export const useLoginStore = create<ILoginState>()(
  devtools(
    persist(
      (set, get) => ({
        ...defaultState(),
        setJwt: (token) => set({ jwt: 'Bearer ' + token }),
        setAccessiblePaths: (accessiblePaths) => set({ accessiblePaths }),
        clear: () => set(defaultState()),
      }),
      { name: 'useLoginStore', version: 1 }
    ),
    { name: 'useLoginStore' }
  )
);
