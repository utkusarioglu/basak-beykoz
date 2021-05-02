import { Selector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { WrtSingularItem } from '../../@types/wp-types';

export type SingularRepoSliceState = Record<string, TimestampedSingular>;

interface TimestampedSingular {
  fetchTime: number; // epoch
  data: WrtSingularItem;
}

export type AddSingular = (singular: WrtSingularItem) => void;

export type SelectSingular = (
  slug: string
) => Selector<RootState, TimestampedSingular>;
