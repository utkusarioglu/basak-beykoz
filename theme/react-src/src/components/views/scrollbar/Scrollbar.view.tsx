import React from 'react';
import type { FC, RefObject } from 'react';
import { createRef, useState } from 'react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { graceTop } from '../../../utils/scroll.util';
import type { GraceTopViewProps } from '../grace-top/GraceTop.view';
import type OverlayScrollbars from 'overlayscrollbars';

interface ScrollbarViewProps {
  id: string;
  enableGraceTop: boolean;
  graceTopComponent: FC<GraceTopViewProps>;
  onScroll?: (target: EventTarget) => void;
}

const scrollbars: Record<string, RefObject<OverlayScrollbarsComponent>> = {};

const scrollbarRef = createRef<OverlayScrollbarsComponent>();

const ScrollbarView: FC<ScrollbarViewProps> = ({
  id,
  children,
  enableGraceTop,
  graceTopComponent: GraceTopComponent,
  onScroll,
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
            const target = e?.target as any;
            const scrollTop = target.scrollTop;
            setScrolled(scrollTop > window.innerHeight || false);

            onScroll && onScroll(target);
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

/**
 * Returns the scrollbar instance for the given Id
 * @param id scrollbar Id
 * @returns scrollbar instance
 */
export function getScrollbarInstance(
  id: string
): NonNullable<OverlayScrollbars> {
  const instance = scrollbars[id].current?.osInstance();
  if (!instance) {
    throw new Error('instance_not_found');
  }
  return instance;
}

export default ScrollbarView;
