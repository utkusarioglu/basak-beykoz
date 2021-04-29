const { REACT_APP_REST_TIMEOUT } = process.env;

export const REST_TIMEOUT = +REACT_APP_REST_TIMEOUT || 5000;
