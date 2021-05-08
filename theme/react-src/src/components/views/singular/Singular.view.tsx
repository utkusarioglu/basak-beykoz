import React from 'react';
import type { FC } from 'react';
import { SingularSliceRenderEnabled } from '../../../slices/singular/singular.slice.types';
type SingularViewProps = SingularSliceRenderEnabled;

const SingularView: FC<SingularViewProps> = ({ content }) => {
  return (
    <article
      className="singular-view"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default SingularView;
