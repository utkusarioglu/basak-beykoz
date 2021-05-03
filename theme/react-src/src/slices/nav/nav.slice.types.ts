import { Selector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { WpMenuItem } from '../../@types/wp-types';

export interface NavSliceState {
  slug: string;
  fetchTime: number; // epoch
  items: WpMenuItem[];
}
export type SetNav = (payload: SetNavPayload) => void;
export type SetNavPayload = Pick<NavSliceState, 'slug' | 'items'>;
export type SelectNav = Selector<RootState, NavSliceState>;
