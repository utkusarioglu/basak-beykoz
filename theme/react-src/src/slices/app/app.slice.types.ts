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

export type DelayedIsLoading = (state: boolean, latency: number) => () => void;

export type EnableIsLoadingDelayed = () => () => void;

export type DisableIsLoadingDelayed = () => () => void;
