import type { PostContactForm7 } from '../@types/wp-endpoints';
import injection, { InjectionFunction } from '../services/injection.service';
import rest from '../services/rest.service';
import { InvalidField } from '../@types/ContactForm7.types';

const inputFields = ['your-name', 'your-email', 'your-subject', 'your-message'];

/**
 * Attaches the listener for the contact from submit
 */
export const contactFormHandler: InjectionFunction = ({ ref }) => {
  const contactFormElem = ref.querySelector<HTMLElement>('.wpcf7-submit');

  if (!contactFormElem) {
    return injection.dummyInjectionFunction;
  }

  const contactFormOnClick = async (e: Event) => {
    e.preventDefault();
    clearInputControlErrorStyling();
    removeFieldMessages();
    clearGeneralMessage();
    const formData = gatherValues();
    const response = await rest.contactForm(formData);
    console.log(response);
    renderResponse(response);
  };

  const unmountFunc = injection.unmountableEventListener(
    [contactFormElem],
    ['click'],
    contactFormOnClick
  );

  return unmountFunc;
};

/**
 * Gathers values from the contact form elements
 *
 * @returns form data to be sent to rest service
 */
export function gatherValues(): FormData {
  const formData = new FormData();

  inputFields.forEach((selector) => {
    const elem = document.body.querySelector(
      `[name=${selector}]`
    ) as HTMLInputElement;
    formData.append(selector, elem.value);
  });

  return formData;
}

/**
 * Alters the screen in accordance with the response from the server.
 * Sets the success and error styles and messages for the respective controls.
 * @param response Response from the contact form 7 api
 */
function renderResponse(response: PostContactForm7['_res']['Union']) {
  if (response.status !== 'mail_sent') {
    response.invalid_fields.forEach(({ into, message }) => {
      setInputControlStyle(into, 'borderColor', 'var(--brush-red-dark)');
      setFieldMessage(into, message);
    });
  }
  setGeneralMessage(response.message, response.status);
}

/**
 * Sets the given style for the given selector target
 * @param selector selector for which to set the style
 * @param styleProp style property to alter
 * @param value style value
 */
function setInputControlStyle(
  selector: InvalidField['into'],
  styleProp: keyof CSSStyleDeclaration,
  value: string | number
) {
  const domElem = document.body.querySelector(selector) as HTMLElement;
  const inputElem = domElem.children[0] as HTMLElement;
  // @ts-ignore
  inputElem.style[styleProp] = value;
}

/**
 * Reinitializes the styles of the input controls.
 */
function clearInputControlErrorStyling() {
  inputFields.forEach((selector) => {
    const inputElem = document.body.querySelector(
      `[name=${selector}]`
    ) as HTMLElement;
    inputElem.style.borderColor = '';
  });
}

/**
 * Renders the given feedback message for the given input control
 * @param selector selector for which the field feedback message to set
 * @param message message string to render
 */
function setFieldMessage(
  selector: InvalidField['into'],
  message: InvalidField['message']
) {
  const domElem = document.body.querySelector(selector) as HTMLElement;
  const errorElem = document.createElement('div');
  errorElem.innerText = message;
  errorElem.className = 'form-error-message';
  domElem.appendChild(errorElem);
}

/**
 * Removes all the feedback messages that appear under input controls
 */
function removeFieldMessages() {
  const messages = document.body.querySelectorAll('.form-error-message');
  Array.from(messages).forEach((message) =>
    message.parentElement?.removeChild(message)
  );
}

/**
 * Sets the general message that appears under the submit button
 * @param message message string to render
 * @param status message status - success or error
 */
function setGeneralMessage(
  message: string,
  status: PostContactForm7['_res']['Union']['status']
) {
  const div = document.body.querySelector(
    '.wpcf7-response-output'
  ) as HTMLElement;
  const child = document.createElement('div');
  child.className = status;
  child.innerText = message;
  div.appendChild(child);
}

/**
 * Removes the general message that appears under the submit button
 */
function clearGeneralMessage() {
  const div = document.body.querySelector(
    '.wpcf7-response-output'
  ) as HTMLElement;
  div.innerText = '';
}
