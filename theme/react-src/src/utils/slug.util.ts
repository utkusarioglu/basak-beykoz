import { HOME_SLUG } from '../config';

type StringIdentityFunc = (slug: string) => string;

/**
 * Converts an empty or undefined slug to one with a slash at the end
 * @param slug slug to convert to url compatible format
 * @returns address bar routing compatible slug
 */
export const urlSlug: StringIdentityFunc = (slug) =>
  (slug !== undefined && slug !== '' ? `/${slug}/` : '/').replace('//', '/');

/**
 * Converts raw slug to values that the rest api would understand.
 * This involved getting rid of empty and undefined values and also converting
 * '/' to '/home' or rather HOME_SLUG value from env.
 * @param slug slug to convert to restful api compatible format
 * @returns rest api compatible slug
 */
export const restSlug: StringIdentityFunc = (slug) =>
  (slug !== undefined && slug !== '' && slug !== '/'
    ? `/${slug}`
    : `/${HOME_SLUG}`
  ).replace('//', '/');

/**
 * Removes the preceding slash from the given slug, it also converts
 * any undefined value to HOME_SLUG value from env.
 * @param rawSlug slug that may have a slash at the beginning
 * @returns slug that could be used for state comparison
 */
export const cleanSlug: StringIdentityFunc = (rawSlug) => {
  const slashlessSlug = rawSlug.replace('/', '');
  return rawSlug === undefined ? HOME_SLUG : slashlessSlug;
};
