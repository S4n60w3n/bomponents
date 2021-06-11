import React from 'react'
import styled from 'styled-components'

import { FileUpload } from './FileUpload/FileUpload'
import { ImageCrop } from './ImageCrop/ImageCrop'

const Wrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`

const SFileUpload = styled(FileUpload)`
  position: relative;
  height: 100%;
`

type Props = {
  single?: boolean
  values?: string[]
  aspect: number
  maxHeight?: number
  maxWidth?: number
  onCrop(data: Blob[]): void
  className?: string
}

export const ImageUpload: React.FC<Props> = ({
  onCrop: onDataCrop,
  aspect,
  values,
  single,
  maxHeight,
  maxWidth,
  className,
}) => {
  const [uploadedData, setUploadedData] = React.useState<string[]>(values || [])
  const [index, setIndex] = React.useState(0)
  const [data, setData] = React.useState<{ [key: number]: Blob }>({})
  const onCrop = (blob: Blob) => {
    setData((prev) => ({ ...prev, [index]: blob }))
    if (index >= uploadedData.length - 1) {
      onDataCrop([...Object.values(data), blob])
    }
    setIndex((prev) => prev + 1)
  }

  React.useEffect(() => {
    if (values) {
      setUploadedData(values)
    }
  }, [values])

  const onFileUpload = (images: string[]) => {
    setIndex(0)
    setData({})
    if (single) {
      setUploadedData([images[0]])
    } else {
      setUploadedData(images)
    }
  }
  return (
    <Wrap data-testid="imageUpload" className={className}>
      <>
        {uploadedData[index] ? (
          <ImageCrop
            maxWidth={maxWidth}
            maxHeight={maxHeight}
            aspect={aspect}
            image={uploadedData[index]}
            onSave={onCrop}
          />
        ) : (
          <SFileUpload single={single} onUpload={onFileUpload} />
        )}
      </>
    </Wrap>
  )
}
ImageUpload.displayName = 'ImageUpload'
