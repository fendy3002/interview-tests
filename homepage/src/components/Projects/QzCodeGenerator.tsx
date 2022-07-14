import React from 'react';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import { GithubSVG } from '../SVG/GithubSVG';

export const QzCodeGenerator = () => {
  return (
    <>
      <h2>qz-code-generator</h2>
      <div style={{ marginBottom: '8px' }}>
        <GithubSVG size={24} />{' '}
        <a
          href="https://github.com/fendy3002/qz-code-generator"
          target={'_blank'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          https://github.com/fendy3002/qz-code-generator&nbsp;
          <OpenInNewIcon fontSize="small" />
        </a>
      </div>
      <div style={{ marginBottom: '16px' }}>
        A code generator made using nodejs and nunjucks. It consist of template
        files, and schema files (that direct how the template will render).
        <p>
          Try an example project at codesandbox:{' '}
          <a
            target="_blank"
            href="https://codesandbox.io/s/qz-code-generator-4cb4j7"
          >
            https://codesandbox.io/s/qz-code-generator-4cb4j7
          </a>
        </p>
      </div>
    </>
  );
};
