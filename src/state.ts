import { createGlobalState } from 'react-hooks-global-state';

const initialState = { shoppingCartLength: 0 };
const { useGlobalState } = createGlobalState(initialState);

export default useGlobalState;
