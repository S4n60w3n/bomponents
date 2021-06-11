import React from 'react'
import styled, { css } from 'styled-components'

import { pxToRem } from '../../../utils/utils'
import { Modal } from './Modal'
import { PreviewList } from '../Preview/PreviewList'
import { ImageUploadData } from '../../../@types/types'
import { BlueButton, LightButton } from '../../common/Button'

const ControlWrap = styled.div(
  ({ theme }) => css`
    position: absolute;
    left: ${pxToRem(60)};
    bottom: ${pxToRem(60)};
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - ${pxToRem(120)});

    @media only screen and (max-width: ${theme.breakpoint.tabletH}) {
      margin-top: auto;
    }

    @media only screen and (max-width: ${theme.breakpoint.tabletV}) {
      flex-direction: column;
      gap: ${pxToRem(43)};
    }
  `,
)

const SLightButton = styled(LightButton)(
  ({ theme }) => css`
    line-height: 1;
    width: ${pxToRem(210)};
    padding: ${pxToRem(14, 10)};

    @media only screen and (max-width: ${theme.breakpoint.tabletV}) {
      width: 100%;
    }
  `,
)

const SBlueButton = styled(BlueButton)(
  ({ theme }) => css`
    line-height: 1;
    width: ${pxToRem(210)};
    padding: ${pxToRem(11, 10)};

    @media only screen and (max-width: ${theme.breakpoint.tabletV}) {
      width: 100%;
    }
  `,
)

type Props = {
  cover?: boolean
  images: ImageUploadData[]
  amount?: number
  isOpen?: boolean
  onClose(): void
  setImages(data: ImageUploadData[]): void
  onSave(): void
  onEdit(data: ImageUploadData): void
  onMore(): void
  className?: string
}

export const PreviewModal: React.FC<Props> = ({
  onSave,
  amount,
  cover,
  images,
  setImages,
  isOpen = false,
  onEdit,
  onMore,
  onClose,
  className,
}) => {
  const onImageEdit = React.useCallback(
    (index: number) => {
      onEdit(images[index])
    },
    [onEdit, images],
  )

  const onDelete = React.useCallback(
    (index: number) => {
      const pre = images.slice(0, index)
      const post = images.slice(index + 1, images.length)
      setImages([...pre, ...post])
    },
    [setImages, images],
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={`preview ${className}`}>
      <PreviewList
        cover={cover}
        onSort={setImages}
        onEdit={onImageEdit}
        onDelete={onDelete}
        images={images}
      />
      <ControlWrap>
        <SLightButton
          onClick={onMore}
          disabled={Boolean(amount && images.length > amount)}
        >
          Add More
        </SLightButton>
        <SBlueButton onClick={onSave}>Save</SBlueButton>
      </ControlWrap>
    </Modal>
  )
}
PreviewModal.displayName = 'PreviewModal'
