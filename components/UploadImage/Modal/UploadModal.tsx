import React from 'react'
import styled, { css } from 'styled-components'

import { pxToRem } from '../../../utils/utils'
import { Modal } from './Modal'
import { ImageUploadData } from '../../../@types/types'
import { BlueButton, LightButton } from '../common/Button'
import { Throbber } from '../common/Throbber'

const SModal = styled(Modal)`
  padding: ${pxToRem(80, 40, 40)};
`

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

const CenterWrap = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: ${theme.color.dark};
    font-size: ${pxToRem(20)};
  `,
)

type Props = {
  isOpen: boolean
  images: ImageUploadData[]
  onSuccess(images: ImageUploadData[]): void
  onUpload(image: ImageUploadData): Promise<boolean>
  onFail(): void
  onClose(): void
  className?: string
}

export const UploadModal: React.FC<Props> = ({
  isOpen,
  images,
  onSuccess,
  onUpload,
  onFail,
  onClose,
  className,
}) => {
  const [uploadIndex, setUploadIndex] = React.useState(1)
  const uploadedMap = React.useRef<{ [key: string]: boolean }>({})
  const [error, setError] = React.useState('')
  const upload = React.useCallback(async () => {
    for (const image of images) {
      setUploadIndex((prev) => prev + 1)
      if (uploadedMap.current[image.key]) {
        continue
      }
      if (!(await onUpload(image))) {
        setError('Unexpected error')
        return
      }
      uploadedMap.current[image.key] = true
    }
    onSuccess(images)
  }, [images, onUpload, setUploadIndex])

  React.useEffect(() => {
    if (isOpen) {
      setUploadIndex(0)
      upload()
    }
  }, [isOpen])
  if (error) {
    return (
      <SModal
        isOpen={isOpen}
        onClose={onClose}
        className={`upload ${className}`}
      >
        {error}
        <ControlWrap>
          <div />
          <SLightButton onClick={onFail}>Go Back</SLightButton>
        </ControlWrap>
      </SModal>
    )
  }
  return (
    <SModal isOpen={isOpen} onClose={onClose} className={`upload ${className}`}>
      <CenterWrap>
        <Throbber />
        Uploading {uploadIndex} / {images.length}
      </CenterWrap>
      <ControlWrap>
        <div />
        <SLightButton onClick={onFail}>Cancel</SLightButton>
      </ControlWrap>
    </SModal>
  )
}
UploadModal.displayName = 'UploadModal'
