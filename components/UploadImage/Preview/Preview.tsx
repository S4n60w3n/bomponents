import React from 'react'
import styled, { css } from 'styled-components'

import { pxToRem } from '../../../utils/utils'
import { ButtonLink } from '../../common/ButtonLink'

const Image = styled.img`
  width: 100%;
  height: auto;
`

const Warn = styled.div(
  ({ theme }) => css`
    color: ${theme.color.orange};
    font-size: ${pxToRem(16)};
  `,
)

const Wrap = styled.div`
  position: relative;
  padding: ${pxToRem(4)};
`

const ControlWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${pxToRem(5)};
`

const SButtonLink = styled(ButtonLink)(
  ({ theme }) => css`
    position: relative;
    font-size: ${pxToRem(12)};
    line-height: 1;
    font-weight: ${theme.font.weight.semibold};
  `,
)

type Props = {
  onEdit?(): void
  onDelete?(): void
  src: string
  alt: string
  className?: string
}

export const Preview: React.FC<Props> = ({
  src,
  alt,
  className,
  onDelete,
  onEdit,
}) => {
  return (
    <Wrap data-testid="imagePreview" className={className}>
      <Image src={src} alt={alt} data-testid="imagePreviewImage" />
      <ControlWrap>
        {onEdit && (
          <SButtonLink data-testid="imagePreviewEdit" onClick={onEdit}>
            EDIT
          </SButtonLink>
        )}
        {onDelete && (
          <SButtonLink data-testid="imagePreviewDelete" onClick={onDelete}>
            DELETE
          </SButtonLink>
        )}
      </ControlWrap>
    </Wrap>
  )
}
Preview.displayName = 'Preview'
