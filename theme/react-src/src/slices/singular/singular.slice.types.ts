import { Selector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { WrtSingularItem } from '../../@types/wp-types';

/**
 * Singular slice state consists of a union state for render enabled singular
 * and a render disabled empty state.
 */
export type SingularSliceState =
  | SingularSliceRenderEnabled
  | SingularSliceRenderDisabled;

export type SingularSliceRenderEnabled = WrtSingularItem & {
  render: true;
};

type SingularSliceRenderDisabled = {
  render: false;
};

export type SetSingular = (singular: WrtSingularItem) => void;

export type ClearSingular = () => void;

export type SelectSingular = Selector<RootState, SingularSliceState>;
