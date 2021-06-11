import React from 'react'

import { Modal } from './Modal'
import { ImageUploadData } from '../../../@types/types'
import { ImageCrop } from '../ImageCrop/ImageCrop'

type Props = {
  isOpen: boolean
  aspect: number
  image: ImageUploadData | null
  maxHeight?: number
  maxWidth?: number
  onClose(): void
  onSave(data: ImageUploadData): void
  className?: string
}

export const EditImageModal: React.FC<Props> = ({
  onSave,
  image,
  aspect,
  maxHeight,
  maxWidth,
  isOpen,
  onClose,
  className,
}) => {
  const onCrop = React.useCallback(
    (data: Blob) => {
      if (!image) {
        throw new Error('Image should be defined')
      }
      const { key } = image
      onSave({ key, file: data, url: URL.createObjectURL(data) })
    },
    [image, onSave],
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      {image && (
        <ImageCrop
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          aspect={aspect}
          image={image.url}
          onSave={onCrop}
        />
      )}
    </Modal>
  )
}
EditImageModal.displayName = 'EditImageModal'
