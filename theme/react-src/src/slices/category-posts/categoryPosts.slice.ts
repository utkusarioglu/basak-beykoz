import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { dispatch } from '../../store';
import {
  PostsSliceState,
  SetPostsPayload,
  SetPosts,
  ClearPosts,
  SelectPosts,
} from './categoryPosts.slice.types';

const initialState: PostsSliceState = {
  slug: '',
  fetchTime: 0,
  items: [],
};

/**
 * Category posts slice stores the state related to post feeds
 * These are likely to appear in the blogs page and under posts.
 */
const { reducer, actions } = createSlice({
  name: 'categoryPosts',
  initialState,
  reducers: {
    /**
     * Overwrites posts slice state with the payload
     * @param _ state, unused
     * @param param1 payload var
     * @returns new state
     */
    setPosts: (
      _,
      { payload: { slug, items } }: PayloadAction<SetPostsPayload>
    ) => ({
      slug,
      fetchTime: Date.now(),
      items,
    }),
  },
});

export default reducer;

/**
 * Replaces the posts slice state with the given posts
 * @param posts posts to fill the slice
 * @returns void
 */
export const setPosts: SetPosts = (posts) => dispatch(actions.setPosts(posts));

/**
 * Reinitializes the posts slice
 * @returns void
 */
export const clearPosts: ClearPosts = () =>
  dispatch(actions.setPosts(initialState));

/**
 * Returns the posts slice state
 * @param state root state
 * @returns posts slice
 */
export const selectPosts: SelectPosts = (state) => state.categoryPosts;
