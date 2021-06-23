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

export const Minus: React.FC<Props> = ({ className = '' }) => {
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
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </Svg>
  )
}
Minus.displayName = 'Minus'
