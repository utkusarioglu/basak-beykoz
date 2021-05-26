import type { Selector } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

/**
 * Shape of the app slice
 */
export interface AppSliceState {
  isLoading: boolean;
  mobileNavOpen: boolean;
  mobileShareOpen: boolean;
  isHeaderOpaque: boolean;
}

export type SetIsHeaderOpaque = (isOpaque: boolean) => void;

export type SelectIsHeaderOpaque = Selector<
  RootState,
  AppSliceState['isHeaderOpaque']
>;

export type SetIsLoading = (isLoading: boolean) => void;

export type SelectIsLoading = Selector<RootState, AppSliceState['isLoading']>;

export type DelayedIsLoading = (state: boolean, latency: number) => () => void;

export type EnableIsLoadingDelayed = () => () => void;

export type DisableIsLoadingDelayed = () => () => void;

export type SetMobileNavState = (mobileNavOpen: boolean) => void;

export type ToggleMobileNavState = () => void;

export type SelectMobileNavState = Selector<
  RootState,
  AppSliceState['mobileNavOpen']
>;

export type SetMobileShareState = (mobileShareOpen: boolean) => void;

export type ToggleMobileShareState = () => void;

export type SelectMobileShareState = Selector<
  RootState,
  AppSliceState['mobileShareOpen']
>;

export type CloseAllMenus = () => void;
