import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
// Export a hook that can be reused to resolve types
export const useAppDispatch = (): Dispatch<AnyAction> =>
  useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
