import OverlayScrollbars, { Options } from 'overlayscrollbars';
import type {
  InjectionFunction,
  WrappedInjectionFunction,
} from '../services/injection.service';
import injection from '../services/injection.service';
import { anchorCorrectInjection } from './anchor-correct.injection';
import { contactFormInjection } from './contact-form.injection';

/**
 * Injects homepage enhancements
 * @param root {@link OverlayScrollbars} refs object from the store
 * @param history {@link react-router-dom} history object
 */
// export const homeInjection: InjectionFunction = (params) => {
//   return injection.execFunctions([injectWordPressPostEnhancements], params);
// };

/**
 * Attaches wp-latest-posts related items
 * @param refs {@link OverlayScrollbars} refs object from the store
 * @param history {@link react-router-dom} history object
 */
export const homeInjection: InjectionFunction = (params) => {
  /**
   * It appears that the order of this array is important for the proper
   * functioning of overlay scrollbars. Keeping the array in the order of
   * appearance on the page seems to work better
   * */
  const [testimonials, success] = Array.from(
    params.ref.querySelectorAll<HTMLElement>('.wp-block-latest-posts')
  );

  const scrollbarOptions: Options = {
    overflowBehavior: {
      y: 'hidden',
    },
    scrollbars: {
      autoHide: 'leave',
    },
  };

  return injection.execFunctions(
    [
      attachOverlayScrollbars(testimonials, scrollbarOptions),
      replaceTestimonialSpecialChars({ testimonials }),
      attachOverlayScrollbars(success, scrollbarOptions),
      anchorCorrectInjection({ elem: testimonials, parentSelector: 'li' }),
      anchorCorrectInjection({ elem: success, parentSelector: 'li' }),
      contactFormInjection,
    ],
    params
  );
};

/**
 * The client uses certain dashes and slashes to distinguish the name, title
 * and the company of people featured in testimonials.
 * This function replaces these characters (listed in the finds variable) and
 * replaces them with line break
 * A similar action with these delimiters is taken with the page title
 * @param testimonials Html element that houses the testimonial <li>s
 */
// const replaceTestimonialSpecialChars: CustomInjectionFunction<[HTMLElement]> = (
const replaceTestimonialSpecialChars: WrappedInjectionFunction<{
  testimonials: HTMLElement;
}> = ({ testimonials }) => {
  if (!testimonials) {
    return () => injection.dummyInjectionFunction;
  }
  const finds = ['-', '–', '/'];
  const substitution = '<br>';
  const testimonialTitles = testimonials.querySelectorAll('a'); // finds the title

  for (let i = 0; i < testimonialTitles.length; i++) {
    // gets the inner html and reduces all finds with substitution.
    testimonials.querySelectorAll('a')[i].innerHTML = finds.reduce((p, c) => {
      // this replaces the finds surrounded by spaces as well
      return p.replace(` ${c} `, substitution).replace(c, substitution);
    }, testimonials.querySelectorAll('a')[i].innerHTML);
  }

  return () => injection.dummyInjectionFunction;
};

/**
 * Attaches Overlay scrollbars to the testimonials or posts divs.
 * It also starts a basic scroll animation for the items
 * The animation stops if the user hovers over the content.
 * !but "stop" doesn't register before the current animation ends
 * @param elem - Html element to attach the scrollbars to (testimonials, posts etc)
 * @param options - OverlayScrollbars options
 */
const attachOverlayScrollbars = (
  elem: HTMLElement,
  options: Options
): InjectionFunction => {
  OverlayScrollbars(elem, options);
  return () => injection.dummyInjectionFunction;
};
