import { Selector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { WrtSingularItem } from '../../@types/wp-types';

export type CategoryPostsSliceState = {
  slug: string;
  fetchTime: number; // epoch
  items: WrtSingularItem[];
};

export type SetPostsPayload = Pick<CategoryPostsSliceState, 'slug' | 'items'>;

export type SetPosts = (posts: SetPostsPayload) => void;

export type ClearPosts = () => void;

export type SelectPosts = Selector<RootState, CategoryPostsSliceState>;
