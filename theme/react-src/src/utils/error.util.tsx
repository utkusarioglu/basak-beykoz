import ReactGA from 'react-ga';

/**
 * Prepares the error object for Google Analytics error tracking
 * @param error js Error object
 * @param isFatal boolean fatal prop as required by Google Analytics
 * exception tracker
 * @returns Google Analytics Error Tracker field object
 */
export function prepareErrorFields(
  error: Error,
  isFatal: boolean
): ReactGA.FieldsObject {
  const errorContext = {
    error: error.message,
    stack: error.stack,
    date: Date.now(),
    href: window.location.href,
    device: {
      userAgent: navigator.userAgent,
      // @ts-ignore
      memory: navigator.deviceMemory,
      vendor: navigator.vendor,
    },
    conn: {
      // @ts-ignore
      downLink: navigator.connection.downlink,
      // @ts-ignore
      effectiveType: navigator.connection.effectiveType,
    },
    availRes: {
      // eslint-disable-next-line no-restricted-globals
      w: screen.availWidth,
      // eslint-disable-next-line no-restricted-globals
      h: screen.availHeight,
    },
  };

  return {
    description: JSON.stringify(errorContext),
    fatal: isFatal,
  };
}
