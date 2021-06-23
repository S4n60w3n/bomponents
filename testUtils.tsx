import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { ThemeProvider } from 'styled-components'
import { render } from '@testing-library/react'

import { theme } from './themes'

jest.mock('next/image', () => (props: any) => React.createElement('img', props))

jest.mock('next/link', () => ({ children, href }: any) =>
  React.Children.map(children, (child) =>
    React.cloneElement(child, {
      href,
    }),
  ),
)

export const customRender = (ui: React.ReactElement, mock: any = []) => {
  const AllTheProviders: React.FC = ({ children }) => {
    return (
      <ThemeProvider theme={theme}>
        <>{children}</>
      </ThemeProvider>
    )
  }
  return render(ui, { wrapper: AllTheProviders })
}

export * from '@testing-library/react'

export { customRender as render }
