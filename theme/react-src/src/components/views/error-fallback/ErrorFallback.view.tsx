import React from 'react';
import type { FC } from 'react';
import ReactGA from 'react-ga';

import type { FallbackProps } from 'react-error-boundary';
import { prepareErrorFields } from '../../../utils/error.util';

const BUTTON_STYLE = {
  border: 'none',
  backgroundColor: 'var(--brush-darkYellow)',
  color: 'var(--brush-black)',
  padding: 'var(--sp)',
  borderRadius: 'var(--sp)',
  cursor: 'pointer',
};

export const ErrorFallbackView: FC<FallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  ReactGA.exception(prepareErrorFields(error, true));

  return (
    <div
      role="alert"
      style={{
        padding: 'var(--sp)',
        height: '100%',
        width: '100%',
      }}
    >
      <div
        style={{
          margin: 'auto',
          display: 'grid',
          gridTemplateAreas: `
              "title"
              "explanation"
              "links"
              "retry-button"
              "error-code"
            `,
          alignContent: 'center',
          height: '100%',
          maxWidth: 'max-content',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <h4
          style={{
            gridArea: 'title',
            textAlign: 'center',
            marginTop: 'var(--sp)',
            marginBottom: 'var(--sp)',
          }}
        >
          İlginç bir şeyler oldu{' '}
          <span role="img" aria-label="shocked">
            🤨
          </span>
        </h4>

        <div
          style={{
            ...{
              gridArea: 'explanation',
            },
          }}
        >
          <p>
            İnternet bağlantınızı kontrol ettikten sonra lütfen yeniden dene
            butonuna basın.
          </p>
        </div>

        <button
          onClick={resetErrorBoundary}
          style={{
            ...BUTTON_STYLE,
            gridArea: 'retry-button',
          }}
        >
          Yeniden dene
        </button>

        <pre
          style={{
            gridArea: 'error-code',
            textAlign: 'center',
            fontSize: '0.6em',
          }}
        >
          {error.message}
        </pre>
      </div>
    </div>
  );
};

export default ErrorFallbackView;
