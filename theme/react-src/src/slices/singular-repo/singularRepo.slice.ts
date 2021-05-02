import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
import { WrtSingularItem } from '../../@types/wp-types';
import {
  SingularRepoSliceState,
  AddSingular,
  SelectSingular,
} from './singularRepo.slice.types';

const initialState: SingularRepoSliceState = {};

const { reducer, actions } = createSlice({
  name: 'singularRepo',
  initialState,
  reducers: {
    /**
     * Pushes the given singular to the repo
     * @param state current state
     * @param param1 payload
     * @returns new state
     */
    addToSingularRepo: (state, { payload }: PayloadAction<WrtSingularItem>) => {
      return {
        ...state,
        [payload.slug]: {
          fetchTime: Date.now(),
          data: payload,
        },
      };
    },
  },
});

export default reducer;

/**
 * Pushes the given singular to the singular repo
 * @param singular singular to push to the repo
 * @returns void
 */
export const addToSingularRepo: AddSingular = (singular) =>
  dispatch(actions.addToSingularRepo(singular));

/**
 * Selects a post from the singular repo. Returns undefined if none found
 * @param slug slug for which to search the singular repo
 * @returns singular, or undefined
 */
export const selectSingularBySlug: SelectSingular = (slug) => (state) =>
  state.singularRepo[slug];
