import React from 'react'
import '@testing-library/jest-dom/extend-expect'

jest.mock('next/image', () => (props: any) => React.createElement('img', props))

jest.mock('next/link', () => ({ children, href }: any) =>
  React.Children.map(children, (child) =>
    React.cloneElement(child, {
      href,
    }),
  ),
)

export * from '@testing-library/react'
