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
} from './app.slice.types';
import {
  LOADING_INDICATOR_APPEAR_AFTER,
  LOADING_INDICATOR_DISAPPEAR_AFTER,
} from '../../config';

const initialState: AppSliceState = {
  isLoading: false,
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
