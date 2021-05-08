import { WrtSingularItem } from '../../@types/wp-types';

/**
 *
 * @param param0 singular item coming from the server
 * @returns excerpt string that meets the requirements
 */
function buildExcerpt({ content, excerpt }: WrtSingularItem): string {
  // Limits for the excerpt text
  const lowerLimit = 100;
  const upperLimit = 250;

  /**
   * Remove render tags and needless new lines created by wp
   */
  const cleanContent = content
    .split(/<[/]?p>/)
    .join('')
    .split(/[\n]{1,}/)
    .filter((e) => e !== '')
    .join('. ');

  /**
   * Create variations to choose from
   */
  const variations = [
    excerpt,
    // create 4 different sentence lengths based on where periods are placed
    ...Array(4)
      .fill(undefined)
      .map(
        (_, i) =>
          cleanContent
            .split('.')
            .slice(0, i + 1)
            .join('.')
            .trim() + '.'
      ),
    // safety value, for
    cleanContent.slice(0, upperLimit - 3) + '...',
  ];

  return (
    variations.find((e) => e.length >= lowerLimit && e.length <= upperLimit) ||
    '-'
  );
}

/**
 * Converts the post to the format that the slice state requires
 *
 * @remarks
 * Not much actually changes with the post slice items for this project. But
 * the possibility of the excerpt being lacking has created the need to do
 * some processing on the client side.
 *
 * @param rawPost post coming from the server
 * @returns post with props that the frontend app expects
 */
export function prepareSlicePost(rawPost: WrtSingularItem): WrtSingularItem {
  return {
    ...rawPost,
    excerpt: buildExcerpt(rawPost),
  };
}
