import { scrollbars } from '../components/views/scrollbar/Scrollbar.view';
import type { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import type { RefObject } from 'react';

/**
 * Abruptly jumps to the top of the scrollbar element for which the id
 * is given.
 * @param id id for the scrollbar at which the jump will occur
 */
export function jumpTop(id: string) {
  try {
    scrollbars[id].current?.osInstance()?.scroll({ y: 0 });
  } catch (e) {
    console.error(e);
  }
}

/**
 * Slowly scrolls to the top of the scrollbar for which the id has been
 * given.
 * @param ref ref object for the scrollbar to gracefully scroll
 */
export function graceTop(ref: RefObject<OverlayScrollbarsComponent>) {
  ref.current?.osInstance()?.scroll({ y: 0 }, 1000);
}

/**
 * Slowly scrolls to a target element for which the id is given
 * It's possible to set a margin top for some clearance.
 * @param id id of the scrollbar in which the scroll will happen
 * @param targetId target element id which will be scrolled into view
 * @param margin margin top offset for the target element
 * @returns
 */
export function graceScroll(id: string, targetId: string, margin: number = 0) {
  const elem = document.getElementById(targetId);
  const current = scrollbars[id].current;

  if (!elem) {
    console.log(`${targetId} not found`);
    return;
  }

  if (!current) {
    return;
  }

  current.osInstance()?.scroll({ el: elem, margin }, 600);
}
