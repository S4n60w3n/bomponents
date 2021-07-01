import * as React from 'react'
import { storiesOf } from '@storybook/react'

import { Experience } from '../../components/Profile/Experience'

storiesOf('Profile/Experience', module).add('default', () => (
  <Experience
    data={[
      {
        title: 'Freelance Software Engineer',
        position: 'Self-Employed',
        fromDate: new Date('2020-02-1'),
        description: [
          'Built a hybrid rendered (static and client) website for displaying and managing places from a database',
          'Created—as a solo developer—a Next.js-based front end with simple minimalist design and micro-interactions written in TypeScript with Jest and React testing library for testing. Its back end is powered with Django and Docker',
          'Built a contentful CMS-powered Next.js page with a focus on performance and a11y. Fully static and client site application',
        ],
        technologies: [
          'Firebase',
          'Firebase Cloud Functions',
          'Cloud Firestore',
          'REST API',
          'Front-end',
          'GraphQL',
          'HTML',
          'CSS',
          'Vercel',
          'AWS Lambda',
          'Node.js',
          'Docker',
          'Continuous Integration (CI)',
          'Python',
          'Next.js',
          'Styled Components',
          'React',
          'TypeScript',
          'JavaScript',
          'WCAG',
          'A11Y',
        ],
      },
    ]}
  />
))
