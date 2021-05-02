import { Selector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { WrtSingularItem } from '../../@types/wp-types';

export type PostsSliceState = {
  slug: string;
  fetchTime: number; // epoch
  items: WrtSingularItem[];
};

export type SetPostsPayload = Pick<PostsSliceState, 'slug' | 'items'>;

export type SetPosts = (posts: SetPostsPayload) => void;

export type ClearPosts = () => void;

export type SelectPosts = Selector<RootState, PostsSliceState>;
