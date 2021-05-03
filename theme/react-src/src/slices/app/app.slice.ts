import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
import type {
  AppSliceState,
  SetIsLoading,
  SelectIsLoading,
  DelayedIsLoading,
  EnableIsLoadingDelayed,
  DisableIsLoadingDelayed,
  SetMobileNavState,
  SelectMobileNavState,
  ToggleMobileNavState,
  SetMobileShareState,
  ToggleMobileShareState,
  SelectMobileShareState,
} from './app.slice.types';
import {
  LOADING_INDICATOR_APPEAR_AFTER,
  LOADING_INDICATOR_DISAPPEAR_AFTER,
} from '../../config';

const initialState: AppSliceState = {
  isLoading: false,
  mobileNavOpen: false,
  mobileShareOpen: false,
};

/**
 * App slice stores general state of the app.
 * These may include the loading state or whether some event has
 * occurred for the user.
 */
const { actions, reducer } = createSlice({
  name: 'app',
  initialState,
  reducers: {
    /**
     * Sets the variable that the app uses for indicating whether it is
     * in a loading state.
     * @param state current app state
     * @param param1 contains payload
     * @returns new state
     */
    setIsLoading: (state, { payload: isLoading }: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading,
      };
    },

    setMobileNavState: (
      state,
      { payload: mobileNavOpen }: PayloadAction<boolean>
    ) => {
      return {
        ...state,
        mobileNavOpen,
        mobileShareOpen: false,
      };
    },

    setMobileShareState: (
      state,
      { payload: mobileNavOpen }: PayloadAction<boolean>
    ) => {
      return {
        ...state,
        mobileNavOpen,
        mobileShareOpen: false,
      };
    },

    toggleMobileNavState: (state) => {
      return {
        ...state,
        mobileNavOpen: !state.mobileNavOpen,
        mobileShareOpen: false,
      };
    },

    toggleMobileShareState: (state) => {
      return {
        ...state,
        mobileShareOpen: !state.mobileShareOpen,
        mobileNavOpen: false,
      };
    },
  },
});

export default reducer;

/**
 * Enables or disables the loading state for the app. True enables loading
 * indication,
 * @param isLoading boolean for setting app in a loading state
 * @returns nothing
 */
export const setIsLoading: SetIsLoading = (isLoading) =>
  dispatch(actions.setIsLoading(isLoading));

/**
 * Enables is loading state with config determined state
 * @remarks
 * This is what you should use for most loading cases
 * @returns void
 */
export const enableIsLoadingDelayed: EnableIsLoadingDelayed = () =>
  delayedIsLoading(true, LOADING_INDICATOR_APPEAR_AFTER);

/**
 * Disables is loading state with config determined state
 * @remarks
 * This is what you should use for most loading cases
 * @returns void
 */
export const disableIsLoadingDelayed: DisableIsLoadingDelayed = () =>
  delayedIsLoading(false, LOADING_INDICATOR_DISAPPEAR_AFTER);

/**
 * Returns a boolean indicating whether the app is in a loading state.
 * @param state root state
 * @returns boolean indicating whether the app is in a loading state
 */
export const selectIsLoading: SelectIsLoading = (state) => state.app.isLoading;

/**
 * Dispatches the isLoading state at a given latency
 * @param state boolean for setting isLoading
 * @param latency the latency for dispatching the state
 * @returns void
 */
export const delayedIsLoading: DelayedIsLoading = (state, latency) => {
  const timer = setTimeout(() => setIsLoading(state), latency);
  return () => clearTimeout(timer);
};

/**
 * Sets the open/close state of mobile menu
 * @param state boolean for whether the mobile menu is open
 * @returns void
 */
export const setMobileNavState: SetMobileNavState = (state) =>
  dispatch(actions.setMobileNavState(state));

/**
 * Toggles the boolean that controls whether the mobile nav is open
 * @returns void
 */
export const toggleMobileNavState: ToggleMobileNavState = () =>
  dispatch(actions.toggleMobileNavState());

/**
 * Returns a boolean for whether the mobile menu is open
 * @param state root state
 * @returns boolean for whether the mobile menu is open
 */
export const selectMobileNavState: SelectMobileNavState = (state) =>
  state.app.mobileNavOpen;

/**
 * Sets the boolean that controls whether the mobile share menu is open
 * @param state boolean for whether the mobile share menu is open
 * @returns void
 */
export const setMobileShareState: SetMobileShareState = (state) =>
  dispatch(actions.setMobileShareState(state));

/**
 * Toggles the boolean that controls whether the mobile share menu is open
 * @returns void
 */
export const toggleMobileShareState: ToggleMobileShareState = () =>
  dispatch(actions.toggleMobileShareState());

/**
 * Returns true if the mobile share menu is open
 * @param state root state
 * @returns boolean for whether the mobile share menu is open
 */
export const selectMobileShareState: SelectMobileShareState = (state) =>
  state.app.mobileShareOpen;
