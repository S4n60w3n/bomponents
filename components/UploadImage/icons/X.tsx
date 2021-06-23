import React from 'react'
import styled, { css } from 'styled-components'

const Svg = styled.svg(
  ({ theme }) => css`
    path {
      fill: ${theme.color.medium};
    }

    &.red {
      path {
        fill: ${theme.color.red};
      }
    }
  `,
)

type Props = {
  red?: boolean
  className?: string
}

export const X: React.FC<Props> = ({ className = '', red }) => {
  const redClass = red ? 'red' : ''
  return (
    <Svg
      className={`${redClass} ${className}`}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.99998 6.05711L12.5286 0.528514C12.7889 0.268165 13.211 0.268165 13.4714 0.528514C13.7317 0.788864 13.7317 1.21097 13.4714 1.47132L7.94279 6.99992L13.4714 12.5285C13.7317 12.7889 13.7317 13.211 13.4714 13.4713C13.211 13.7317 12.7889 13.7317 12.5286 13.4713L6.99998 7.94273L1.47138 13.4713C1.21103 13.7317 0.788925 13.7317 0.528575 13.4713C0.268226 13.211 0.268226 12.7889 0.528575 12.5285L6.05717 6.99992L0.528575 1.47132C0.268226 1.21097 0.268226 0.788864 0.528575 0.528514C0.788925 0.268165 1.21103 0.268165 1.47138 0.528514L6.99998 6.05711Z" />
    </Svg>
  )
}
X.displayName = 'XIcon'
