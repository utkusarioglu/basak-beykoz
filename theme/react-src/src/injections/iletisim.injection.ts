// import React from 'react';
import type { InjectionFunction } from '../services/injection.service';
import injection from '../services/injection.service';
import { renderToStaticMarkup } from 'react-dom/server';
import SocialDesktopView from '../components/views/social-desktop/SocialDesktop.view';
import { contactFormInjection } from './contact-form.injection';

/**
 * Injects homepage enhancements
 * @param root {@link OverlayScrollbars} refs object from the store
 * @param history {@link react-router-dom} history object
 */
export const iletisimInjection: InjectionFunction = (params) => {
  return injection.execFunctions([socialLinks, contactFormInjection], params);
};

const socialLinks: InjectionFunction = ({ ref }) => {
  const socialContainer = ref.querySelector('.contact-links__social');
  if (!socialContainer) return injection.dummyInjectionFunction;

  socialContainer.innerHTML = renderToStaticMarkup(SocialDesktopView());

  return injection.dummyInjectionFunction;
};
