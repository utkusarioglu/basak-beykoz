export type ContactForm7Success = {
  into: string; // css selector
  message: string;
  posted_data_hash: string;
  status: 'mail_sent';
};

export type ContactForm7Fail = {
  into: string; // css selector
  invalid_fields: InvalidField[];
  message: string;
  posted_data_hash: '';
  status: 'validation_failed';
};

/**
 * The shape of an error component sent by contact form 7
 */
export type InvalidField = {
  into: string; // selector
  error_id: string;
  idref: unknown;
  message: string;
};
