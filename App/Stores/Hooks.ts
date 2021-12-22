import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store, RootState } from './index';

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
