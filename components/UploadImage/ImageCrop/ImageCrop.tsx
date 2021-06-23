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
  ZOOM_STEP,
} from './ImageCropUtils'
import { Rotate } from '../icons/Rotate'
import { Throbber } from '../common/Throbber'
import { Plus } from '../icons/Plus'
import { Minus } from '../icons/Minus'

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
  padding: ${pxToRem(0, 16)};
  left: 50%;
  transform: translateX(-50%);
  max-width: ${pxToRem(320)};
  width: 100%;
  justify-content: space-between;
  display: flex;
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

    :disabled {
      opacity: 0;
      cursor: initial;

      :hover {
        background-color: ${theme.color.white};
      }
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
  onSave(blob: Blob): void
}

export const ImageCrop: React.FC<Props> = ({
  maxWidth,
  maxHeight,
  image,
  aspect,
  onSave,
  className,
}) => {
  const [loading, setLoading] = React.useState(false)
  const [zoom, setZoom] = React.useState(1)
  const [rotation, setRotation] = React.useState(0)
  const initialCroppedArea = React.useRef<Crop | null>()
  const [croppedAreaPixels, setCroppedAreaPixels] = React.useState<Crop>()

  const ref = React.useRef<HTMLImageElement | null>(null)
  const [crop, setCrop] = React.useState({ x: 0, y: 0 })

  const onCropComplete = React.useCallback(
    async (_, crop: Crop) => {
      if (!initialCroppedArea.current) {
        initialCroppedArea.current = crop
      }
      setCroppedAreaPixels(crop)
    },
    [image],
  )

  React.useEffect(() => {
    initialCroppedArea.current = null
    setRotation(0)
    setZoom(1)
    setCrop({ x: 0, y: 0 })
  }, [image])

  const onCrop = async () => {
    if (!ref.current || !croppedAreaPixels || !initialCroppedArea.current) {
      throw new Error('Crop data should be present')
    }
    setLoading(true)
    const data = await getImageData(
      ref.current,
      croppedAreaPixels,
      initialCroppedArea.current,
      rotation,
      maxWidth,
      maxHeight,
    )
    setLoading(false)
    if (!data) {
      throw new Error('Image crop not successful')
    }
    onSave(data)
  }

  const rotateRight = () => {
    setRotation((prev) => prev + ROTATE_ANGLE)
  }

  const rotateLeft = () => {
    setRotation((prev) => prev - ROTATE_ANGLE)
  }

  const zoomOut = () => {
    setZoom((prev) => Math.max(prev - ZOOM_STEP, MIN_ZOOM))
  }

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM))
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
        <ControlButton
          disabled={loading || zoom <= MIN_ZOOM}
          aria-label="zoom out"
          onClick={zoomOut}
        >
          <Minus />
        </ControlButton>
        <ControlButton
          disabled={loading}
          aria-label="rotate left"
          onClick={rotateLeft}
        >
          <Rotate left />
        </ControlButton>
        <SButton
          disabled={loading}
          data-testid="imageCropButton"
          onClick={onCrop}
          type="submit"
        >
          Crop
        </SButton>
        <ControlButton
          disabled={loading}
          aria-label="rotate right"
          onClick={rotateRight}
        >
          <Rotate />
        </ControlButton>
        <ControlButton
          disabled={loading || zoom >= MAX_ZOOM}
          aria-label="zoom out"
          onClick={zoomIn}
        >
          <Plus />
        </ControlButton>
      </ControlWrap>
      {loading && <Throbber centered />}
    </Wrap>
  )
}
