import React from 'react';
import type { FC } from 'react';
import { useRef } from 'react';
import { useLayoutEffect } from 'react';
import { SingularSliceRenderEnabled } from '../../../slices/singular/singular.slice.types';
import { useHistory } from 'react-router-dom';
// import prefetch from '../../../services/prefetch.service';
// import { cleanSlug } from '../../../utils/slug.util';
// import {
//   enableIsLoadingDelayed,
//   disableIsLoadingDelayed,
// } from '../../../slices/app/app.slice';

type SingularViewProps = SingularSliceRenderEnabled;

const SingularView: FC<SingularViewProps> = ({ content }) => {
  const history = useHistory();

  const singularOnLoad = useRef(() => {
    const domSingularView = document.getElementsByClassName('singular-view')[0];
    const anchors = domSingularView.getElementsByTagName('a');

    const clickEventHandler = (e: any) => {
      if (!e.target.origin.includes(window.location.host)) {
        return;
      }
      e.preventDefault();

      history.push(e.target.pathname);
      // prefetch.singular({
      //   slug: cleanSlug(e.target.pathname),
      //   onFetchStart: enableIsLoadingDelayed,
      //   onFetchComplete: disableIsLoadingDelayed,
      // });
    };

    for (let i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', clickEventHandler as any);
      anchors[i].addEventListener('touch', clickEventHandler as any);
    }

    return () => {
      for (let i = 0; i < anchors.length; i++) {
        anchors[i].removeEventListener('click', clickEventHandler as any);
        anchors[i].removeEventListener('touch', clickEventHandler as any);
      }
    };
  });

  useLayoutEffect(() => singularOnLoad.current(), []);

  return (
    <article
      className="singular-view"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default SingularView;
