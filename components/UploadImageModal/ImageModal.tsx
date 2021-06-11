import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { ImageUpload } from './ImageUpload'
import { Modal } from './Modal'

type Props = {
  isOpen: boolean
  aspect: number
  image?: { key: string; url: string | Blob }
  maxHeight?: number
  maxWidth?: number
  onClose(): void
  onUpload(data: { key: string; url: string | Blob }): void
  className?: string
}

export const ImageModal: React.FC<Props> = ({
  onUpload,
  image,
  aspect,
  maxHeight,
  maxWidth,
  isOpen,
  onClose,
  className,
}) => {
  const onCrop = React.useCallback(([data]: Blob[]) => {
    onUpload({ key: uuidv4(), url: data })
  }, [])

  const onEditCrop = React.useCallback(
    ([data]: Blob[]) => {
      if (!image) {
        throw new Error('Edit image should be defined')
      }
      const { key } = image
      onUpload({ key, url: data })
    },
    [image, onUpload],
  )

  if (image) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} className={className}>
        <ImageUpload
          single
          values={[
            image.url instanceof Blob
              ? URL.createObjectURL(image.url)
              : image.url,
          ]}
          onCrop={onEditCrop}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          aspect={aspect}
        />
      </Modal>
    )
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      <ImageUpload
        single
        onCrop={onCrop}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        aspect={aspect}
      />
    </Modal>
  )
}
ImageModal.displayName = 'ImageModal'
