import React from 'react';
import type { FC, RefObject } from 'react';
import { createRef, useState } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { graceTop } from '../../../utils/scroll.util';
import type { GraceTopViewProps } from '../grace-top/GraceTop.view';

interface ScrollbarsViewProps {
  id: string;
  enableGraceTop: boolean;
  graceTopComponent: FC<GraceTopViewProps>;
}

export const scrollbars: Record<string, RefObject<OverlayScrollbarsComponent>> =
  {};

const scrollbarRef = createRef<OverlayScrollbarsComponent>();

const ScrollbarView: FC<ScrollbarsViewProps> = ({
  id,
  children,
  enableGraceTop,
  graceTopComponent: GraceTopComponent,
}) => {
  const [scrolled, setScrolled] = useState(false);

  return (
    <OverlayScrollbarsComponent
      id={id}
      ref={scrollbarRef}
      options={{
        scrollbars: {
          autoHide: 'move',
        },
        callbacks: {
          onScroll: (e) => {
            // @ts-ignore
            // TODO figure out what type casting is needed for this object
            const scrollTop = e?.target.scrollTop;
            setScrolled(scrollTop > window.innerHeight || false);
          },
          onInitialized: () => {
            scrollbars[id] = scrollbarRef;
          },
        },
      }}
    >
      {children}
      {enableGraceTop && scrolled && (
        <GraceTopComponent onClick={() => graceTop(scrollbarRef)} />
      )}
    </OverlayScrollbarsComponent>
  );
};

export default ScrollbarView;
