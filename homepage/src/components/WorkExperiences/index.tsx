import React from 'react';

import { Section } from '../Section';
import { WorkExperienceTimeline } from './WorkExperienceTimeline';

export const WorkExperiences = (props: any) => {
  return (
    <>
      <Section id="work_experiences" title="Work Experiences">
        <WorkExperienceTimeline />
      </Section>
    </>
  );
};
