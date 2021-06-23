import React from 'react'
import styled, { css } from 'styled-components'

import { pxToRem } from '../../utils/utils'
import { BlueButton } from './common/Button'

const SBlueButton = styled(BlueButton)(
  ({ theme }) => css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: ${theme.font.weight.bold};
    font-size: ${pxToRem(16)};
    line-height: 1;
    width: ${pxToRem(210)};
    padding: ${pxToRem(10)};
  `,
)

const Wrap = styled.div(
  ({ theme }) => css`
    position: relative;
    border: ${pxToRem(1)} solid ${theme.color.medium};
    padding: ${pxToRem(14, 16)};
    border-radius: ${theme.radius.small};
  `,
)

const Box = styled.div(
  ({ theme }) => css`
    position: relative;
    width: 100%;
    background-color: ${theme.color.superLightGray};

    :before {
      content: '';
      display: inline-block;
      padding-top: 100%;
      width: ${pxToRem(1)};
      height: 0;
    }
  `,
)

const BoxWrap = styled.div`
  position: relative;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: min-content;
  place-items: start;
  row-gap: ${pxToRem(20)};
  column-gap: ${pxToRem(10)};
`

type Props = {
  single?: boolean
  onClick(): void
  className?: string
}

export const AddPhotosButton: React.FC<Props> = ({
  single,
  onClick,
  className,
}) => {
  return (
    <Wrap className={className}>
      {single && <Box />}
      {!single && (
        <BoxWrap>
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
          <Box />
        </BoxWrap>
      )}
      <SBlueButton type="button" onClick={onClick}>
        ADD {single ? 'PHOTO' : 'PHOTOS'}
      </SBlueButton>
    </Wrap>
  )
}
AddPhotosButton.displayName = 'AddPhotosButton'
