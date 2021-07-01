export const URL = 'https://www.arokis.me'

export const FULL_NAME = 'Bogdan Sikora'
export const DESCRIPTION =
  'Bogdan is a software developer, a11y/testing advocate and entrepreneur. He is a fan of open source technologies and excels in front-end engineering, smooth CI/CD pipelines, and seamless integrations. He has developed Smart TV applications that are compatible across devices and have over 20 million monthly users. Bogdan helps clients compete and grow with cleverly designed tools that are optimized for peak performance.'
export const PROFILE_IMAGE = `${URL}/profile.jpeg`
export const BACKGROUND_IMAGE = `${URL}/background.jpeg`
export const CSS_FILES = `${URL}/_next/static/styles/styles.css`
export const EXPERIENCE = [
  {
    title: 'Freelance Software Engineer',
    position: 'Self-Employed',
    fromDate: new Date('2020-02-1'),
    description: [
      'Built a hybrid rendered (static and client) website for displaying and managing places from a database',
      'Map website for displaying/searching points on map',
    ],
    technologies: [
      'Firebase Auth',
      'Firebase Functions',
      'Firestore',
      'REST API',
      'HTML',
      'CSS',
      'Node.js',
      'Next.js',
      'React',
      'Styled Components',
      'TailwindCss',
      'TypeScript',
      'JavaScript',
      'MapkitJs',
      'Algolia',
    ],
  },

  {
    title: 'FullStack Software Engineer',
    position: 'Self-Employed',
    fromDate: new Date('2020-12-1'),
    description: [
      'Created—as a solo developer—a Next.js-based front end with simple minimalist design and micro-interactions written in TypeScript with Jest and React testing library for testing. Its back end is powered with Django and Docker',
      'Built a contentful CMS-powered Next.js page with a focus on performance and a11y. Fully static and client site application',
    ],
    technologies: [
      'REST API',
      'GraphQL',
      'HTML',
      'CSS',
      'Vercel',
      'AWS S3',
      'Node.js',
      'Docker',
      'Django',
      'Python',
      'ContentfulCMS',
      'TailwindCss',
      'Next.js',
      'Styled Components',
      'React',
      'TypeScript',
      'JavaScript',
      'WCAG',
      'A11Y',
    ],
  },
  {
    title: 'Frontend Software Engineer',
    position: 'Webscope.io',
    fromDate: new Date('2019-08-1'),
    toDate: new Date('2019-02-1'),
    description: [
      'Developed a continuous integration tool to check the license compliance of applications',
      'Integrated a source control API and server-less architecture',
      'Developed a Python open source tool for verifying license compliance',
    ],
    technologies: [
      'REST API',
      'GraphQL',
      'Continuous Integration',
      'HTML',
      'CSS',
      'Vercel',
      'AWS S3',
      'AWS Codebuild',
      'AWS Lambda',
      'Github API',
      'Gitlab API',
      'Node.js',
      'Docker',
      'Java',
      'Maven',
      'Python',
      'Next.js',
      'Styled Components',
      'React',
      'TypeScript',
    ],
  },
]
