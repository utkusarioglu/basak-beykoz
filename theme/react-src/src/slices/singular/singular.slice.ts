import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
import { WrtSingularItem } from '../../@types/wp-types';
import {
  SingularSliceState,
  SetSingular,
  ClearSingular,
  SelectSingular,
} from './singular.slice.types';

const initialState = {
  render: false,
  // required to correct the type inference behavior of reduxjs/toolkit
} as SingularSliceState;

const { reducer, actions } = createSlice({
  name: 'singular',
  initialState,
  reducers: {
    /**
     * Overwrites the singular state, sets it as render enabled
     * @param _ current state
     * @param param1 payload param
     * @returns new state
     */
    setSingular: (_, { payload }: PayloadAction<WrtSingularItem>) => ({
      render: true as true,
      ...payload,
    }),

    /**
     * Removes the singular from state, sets the content as render disabled.
     * @returns render disabled empty state
     */
    clearSingular: () => ({
      render: false as false,
    }),
  },
});

export default reducer;

/**
 * Overwrites the singular state
 * @param singular singular to use in state
 * @returns void
 */
export const setSingular: SetSingular = (singular) =>
  dispatch(actions.setSingular(singular));

/**
 * Removes the singular in state, sets the content as render disabled
 * @returns void
 */
export const clearSingular: ClearSingular = () =>
  dispatch(actions.clearSingular());

/**
 * Returns the currently set singular
 * @param state root state
 * @returns current singular state
 */
export const selectSingular: SelectSingular = (state) => state.singular;
