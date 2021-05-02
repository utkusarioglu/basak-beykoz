import type { Selector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

/**
 * Shape of the app slice
 */
export interface AppSliceState {
  isLoading: boolean;
}

export type SetIsLoading = (isLoading: boolean) => void;

export type SelectIsLoading = Selector<RootState, AppSliceState['isLoading']>;
