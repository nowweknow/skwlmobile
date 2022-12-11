import {TypedUseSelectorHook, useDispatch, useSelector as _useSelector} from 'react-redux';
import {RootState} from 'app/redux/store';

export const useAppDispatch = () => useDispatch();
export const useSelector: TypedUseSelectorHook<RootState> = _useSelector;
export * from './useDynamicLink'
