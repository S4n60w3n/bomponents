import React from 'react'
import styled, { css } from 'styled-components'

const Svg = styled.svg(
  ({ theme }) => css`
    stroke: ${theme.color.medium};
  `,
)

type Props = {
  red?: boolean
  className?: string
}

export const Plus: React.FC<Props> = ({ className = '' }) => {
  return (
    <Svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </Svg>
  )
}
Plus.displayName = 'Plus'
