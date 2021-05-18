import { WrappedInjectionFunction } from '../services/injection.service';
import injection from '../services/injection.service';

/**
 * Allows non-link components parents of an anchor to act as links.
 *
 * @remarks
 * There are some limitations in wordpress that hinder UX. One of these is
 * wp's in ability to wrap groups in `a` tag. Which means, that it's not
 * possible to create a link card.
 *
 * One other place this comes up with is the `wp-block-latest-posts`. The
 * fact that only the title of the post is a link hinders ux, by confusing the
 * user.
 *
 * This function takes a parent element and makes sure that any touch or click
 * within the element triggers the `a` tag inside the parent. For example, for
 * wp-block-latest-posts, this parent is the `li` element.
 *
 * @param param0 elem for the html element that contains the
 * wordpress list items
 * @returns () => injection function
 */
export const anchorCorrectInjection: WrappedInjectionFunction<{
  elem: HTMLElement;
  parentSelector: string;
}> = ({ elem, parentSelector }) => {
  const parents = elem.querySelectorAll(parentSelector);

  const handler = (e: any) => {
    const closest = e.target.closest(parentSelector);
    const a = closest?.querySelector('a');
    a?.click();
  };

  return () =>
    injection.unmountableEventListener(
      Array.from(parents) as HTMLElement[],
      ['click', 'touch'],
      handler
    );
};
