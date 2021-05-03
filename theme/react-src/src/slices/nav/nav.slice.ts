import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
import {
  NavSliceState,
  SetNavPayload,
  SetNav,
  SelectNav,
} from './nav.slice.types';

const initialState: NavSliceState = {
  slug: '',
  fetchTime: 0,
  items: [],
};

const { reducer, actions } = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setNav: (
      _,
      { payload: { items, slug } }: PayloadAction<SetNavPayload>
    ) => ({
      slug,
      items,
      fetchTime: Date.now(),
    }),
  },
});

export default reducer;

/**
 * Overwrites the nav content for the app
 * @param payload items and the slug for tne nav
 * @returns void
 */
export const setNav: SetNav = (payload) => dispatch(actions.setNav(payload));

/**
 * Returns the current nav state
 * @param state root state
 * @returns current nav items and slug
 */
export const selectNav: SelectNav = (state) => state.nav;
