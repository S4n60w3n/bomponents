import React from 'react'
import styled, { css } from 'styled-components'

const Svg = styled.svg(
  ({ theme }) => css`
    stroke: ${theme.color.medium};

    &.left {
      transform: scaleX(-1);
    }
  `,
)

type Props = {
  left?: boolean
  className?: string
}

export const Rotate: React.FC<Props> = ({ className = '', left }) => {
  const leftClass = left ? 'left' : ''
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} ${leftClass}`}
    >
      <polyline points="23 4 23 10 17 10" />
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
    </Svg>
  )
}
Rotate.displayName = 'RotateIcon'
