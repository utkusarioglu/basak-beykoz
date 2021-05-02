import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
import type {
  AppSliceState,
  SetIsLoading,
  SelectIsLoading,
} from './app.slice.types';

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
 * Returns a boolean indicating whether the app is in a loading state.
 * @param state root state
 * @returns boolean indicating whether the app is in a loading state
 */
export const selectIsLoading: SelectIsLoading = (state) => state.app.isLoading;
