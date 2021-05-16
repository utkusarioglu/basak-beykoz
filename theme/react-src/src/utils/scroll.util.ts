import { scrollbars } from '../components/views/scrollbar/Scrollbar.view';
import type { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import type { RefObject } from 'react';

export function jumpTop(id: string) {
  try {
    scrollbars[id].current?.osInstance()?.scroll({ y: 0 });
  } catch (e) {
    console.error(e);
  }
}

export function graceTop(ref: RefObject<OverlayScrollbarsComponent>) {
  ref.current?.osInstance()?.scroll({ y: 0 }, 1000);
}
