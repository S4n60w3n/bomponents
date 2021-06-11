import React from 'react'
import styled, { css } from 'styled-components'
import Cropper from 'react-easy-crop'

import { pxToRem } from '../../../utils/utils'
import {
  Crop,
  getImageData,
  MAX_ZOOM,
  MIN_ZOOM,
  ROTATE_ANGLE,
} from './ImageCropUtils'
import { Rotate } from '../../icons/Rotate'

const CropWrap = styled.div`
  position: relative;
  width: 100%;
  flex: none;
  height: 100%;
`

const Wrap = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
`

const HiddenImage = styled.img`
  position: absolute;
  visibility: hidden;
`

const ControlWrap = styled.div`
  position: absolute;
  bottom: ${pxToRem(20)};
  left: 50%;
  transform: translateX(-50%);
  display: flex;

  > *:first-of-type {
    margin-right: ${pxToRem(16)};
  }

  > *:last-of-type {
    margin-left: ${pxToRem(16)};
  }
`

const ControlButton = styled.button(
  ({ theme }) => css`
    background-color: ${theme.color.white};
    padding: ${pxToRem(10)};
    width: ${pxToRem(40)};
    height: ${pxToRem(40)};
    border: none;
    box-shadow: ${theme.boxShadow.default};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
      background-color: ${theme.color.light};
    }
  `,
)

const SButton = styled.button(
  ({ theme }) => css`
    color: ${theme.color.medium};
    background-color: ${theme.color.white};
    font-size: ${pxToRem(16)};
    padding: ${pxToRem(6, 24)};
    border: none;
    border-radius: ${theme.radius.small};
    border-radius: ${theme.radius.small};

    :hover {
      background-color: ${theme.color.light};
    }
  `,
)

type Props = {
  maxWidth?: number
  maxHeight?: number
  aspect: number
  image: string
  className?: string
  onSubmit(blob: Blob): void
}

export const ImageCrop: React.FC<Props> = ({
  maxWidth,
  maxHeight,
  image,
  aspect,
  onSubmit,
  className,
}) => {
  const [zoom, setZoom] = React.useState(1)
  const [rotation, setRotation] = React.useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Crop>()

  const ref = React.useRef<HTMLImageElement | null>(null)
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })

  const onCropComplete = React.useCallback(
    async (_, crop: Crop) => {
      setCroppedAreaPixels(crop)
    },
    [image],
  )

  React.useEffect(() => {
    setCrop({ x: 0, y: 0 })
  }, [image])

  const onCrop = async () => {
    if (!ref.current || !croppedAreaPixels) {
      throw new Error('Crop data should be present')
    }
    const data = await getImageData(
      ref.current,
      croppedAreaPixels,
      rotation,
      maxWidth,
      maxHeight,
    )
    if (!data) {
      throw new Error('Image crop not successful')
    }
    onSubmit(data)
  }

  const rotateRight = () => {
    setRotation((prev) => prev + ROTATE_ANGLE)
  }

  const rotateLeft = () => {
    setRotation((prev) => prev - ROTATE_ANGLE)
  }

  return (
    <Wrap data-testid="imageCrop" className={className}>
      <CropWrap>
        <HiddenImage data-testid="imageCropImage" ref={ref} src={image} />
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          onRotationChange={setRotation}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          aspect={aspect}
          restrictPosition={false}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </CropWrap>
      <ControlWrap>
        <ControlButton aria-label="rotate left" onClick={rotateLeft}>
          <Rotate left />
        </ControlButton>
        <SButton data-testid="imageCropButton" onClick={onCrop} type="submit">
          Crop
        </SButton>
        <ControlButton aria-label="rotate right" onClick={rotateRight}>
          <Rotate />
        </ControlButton>
      </ControlWrap>
    </Wrap>
  )
}
