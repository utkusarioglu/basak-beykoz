import { useHistory } from 'react-router-dom';
import { preloadAndRoute } from '../utils/preload.util';
import { useErrorHandler } from 'react-error-boundary';

export const interceptLinks = (
  history: ReturnType<typeof useHistory>,
  handleError: ReturnType<typeof useErrorHandler>
) => {
  const domSingularView = document.getElementsByClassName('singular-view')[0];
  const anchors = domSingularView.getElementsByTagName('a');

  const clickEventHandler: (e: any) => void = (e) => {
    if (!e.target.origin.includes(window.location.host)) {
      return;
    }
    e.preventDefault();

    preloadAndRoute({
      to: e.target.pathname,
      history,
      errorHandler: handleError,
      jumpTop: true,
    });
  };

  for (let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', clickEventHandler);
    anchors[i].addEventListener('touch', clickEventHandler);
  }

  return () => {
    for (let i = 0; i < anchors.length; i++) {
      anchors[i].removeEventListener('click', clickEventHandler);
      anchors[i].removeEventListener('touch', clickEventHandler);
    }
  };
};
