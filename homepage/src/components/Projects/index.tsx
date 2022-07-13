import React from 'react';

import { Divider } from '@mui/material';

import { Section } from '../Section';
import { InterviewTests } from './InterviewTests';
import { Keylocked } from './Keylocked';
import { QzCodeGenerator } from './QzCodeGenerator';
import { QzEvaluator } from './QzEvaluator';
import { QzPromise } from './QzPromise';
import { QzReactKeylock } from './QzReactKeylock';

export const Projects = (props: any) => {
  return (
    <>
      <Section id="projects" title="Projects">
        <Keylocked>
          <div style={{ paddingLeft: '32px', paddingRight: '32px' }}>
            <QzReactKeylock />
            <Divider />
            <QzPromise />
            <Divider />
            <QzCodeGenerator />
            <Divider />
            <QzEvaluator />
            <Divider />
            <InterviewTests />
          </div>
        </Keylocked>
      </Section>
    </>
  );
};
