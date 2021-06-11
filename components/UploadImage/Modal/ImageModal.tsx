import React from 'react'
import { v4 as uuidv4 } from 'uuid'

import { ImageUpload } from '../ImageUpload'
import { Modal } from './Modal'
import { ImageUploadData } from '../../../@types/types'

type Props = {
  isOpen: boolean
  aspect: number
  maxHeight?: number
  maxWidth?: number
  single?: boolean
  onClose(): void
  onSave(data: ImageUploadData[]): void
  className?: string
}

export const ImageModal: React.FC<Props> = ({
  onSave,
  aspect,
  single = true,
  maxHeight,
  maxWidth,
  isOpen,
  onClose,
  className,
}) => {
  const onCrop = React.useCallback(
    (data: Blob[]) => {
      onSave(
        data.map((item) => ({
          key: uuidv4(),
          file: item,
          url: URL.createObjectURL(item),
        })),
      )
    },
    [onSave],
  )

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={className}>
      <ImageUpload
        single={single}
        onCrop={onCrop}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        aspect={aspect}
      />
    </Modal>
  )
}
ImageModal.displayName = 'ImageModal'
