import React from 'react'
import styled, { css } from 'styled-components'
import { useField } from 'formik'
import { v4 as uuidv4 } from 'uuid'

import { pxToRem } from '../../utils/utils'
import { ImageUploadData } from '../../@types/types'
import { BlueButton } from './common/Button'
import { X } from './icons/X'
import { ImageModal } from './Modal/ImageModal'
import { EditImageModal } from './Modal/EditImageModal'
import { PreviewList } from './Preview/PreviewList'
import { PreviewModal } from './Modal/PreviewModal'
import { UploadModal } from './Modal/UploadModal'
import { AddPhotosButton } from './AddPhotosButton'

const Wrap = styled.div``

const StyledX = styled(X)`
  width: 0.5rem;
  height: 0.5rem;
  margin: 0 0.625rem 0 0.3125rem;
`

export const Error = styled.div(
  ({ theme }) => css`
    margin-top: 0.5rem;
    display: block;
    visibility: hidden;
    font-weight: ${theme.font.weight.regular};
    color: ${theme.color.red};
    font-size: ${pxToRem(14)};

    &.warning {
      color: ${theme.color.highlight};
    }

    &.error {
      visibility: visible;
    }
  `,
)

const SLegend = styled.label(
  ({ theme }) => css`
    color: ${theme.color.dark};
    font-weight: ${theme.font.weight.semibold};
    display: block;
    font-size: ${pxToRem(16)};

    .error & {
      color: ${theme.color.red};
    }
  `,
)

const Description = styled.p(
  ({ theme }) => css`
    color: ${theme.color.dark};
    font-size: ${pxToRem(16)};
    margin: 0.625rem 0;
    line-height: 1.5;
  `,
)

const SBlueButton = styled(BlueButton)(
  ({ theme }) => css`
    font-weight: ${theme.font.weight.bold};
    font-size: ${pxToRem(16)};
    line-height: 1;
    margin-top: ${pxToRem(20)};
    width: 100%;
    padding: ${pxToRem(10)};
  `,
)

const SPreviewList = styled(PreviewList)`
  .grid {
    position: relative;
    width: 100%;
    grid-template-columns: repeat(3, 1fr);
    gap: ${pxToRem(8)};

    &.cover {
      > *:first-of-type {
        grid-column: 1 / 4;
        width: 50%;
        max-width: none;
      }
    }
  }

  &.single {
    .grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0;
    }
  }
`

type OpenModal = 'crop' | 'preview' | 'edit' | 'upload' | null

type Props = {
  label: string
  name: string
  maxAmount?: number
  description?: string
  cover?: boolean
  aspect: number
  onUpload(image: ImageUploadData): Promise<boolean>
  maxWidth?: number
  maxHeight?: number
  className?: string
}

export const FileInput: React.FC<Props> = ({
  label,
  name,
  onUpload,
  cover,
  maxAmount,
  maxWidth,
  maxHeight,
  aspect,
  description,
  className = '',
}) => {
  const edit = React.useRef<ImageUploadData | null>(null)
  const [modal, setModal] = React.useState<OpenModal>(null)
  const [{ value }, { error, touched }, { setValue }] = useField<
    ImageUploadData[]
  >(name)
  const [images, setImages] = React.useState<ImageUploadData[]>(value)
  const errorClass = Boolean(error && touched) ? 'error ' : ''

  const onUpdateImages = React.useCallback(
    (values: ImageUploadData[]) => {
      if (values.length === 0) {
        setModal('crop')
      }
      setImages(values)
    },
    [setModal, setImages, maxAmount],
  )

  const onSave = React.useCallback(
    (values: ImageUploadData[]) => {
      if (maxAmount) {
        setImages((prev) => [...prev, ...values].slice(0, maxAmount))
      } else {
        setImages((prev) => [...prev, ...values])
      }
      setModal('preview')
    },
    [setModal, setImages, maxAmount],
  )

  const onEditSave = React.useCallback(
    (data: ImageUploadData) => {
      setImages((prev) =>
        prev.reduce(
          (res, { key, ...rest }) => [
            ...res,
            key === data.key ? { ...data, key: uuidv4() } : { key, ...rest },
          ],
          [] as ImageUploadData[],
        ),
      )
      setModal('preview')
    },
    [setImages, setModal, images],
  )

  const onAdd = React.useCallback(() => {
    setModal('crop')
  }, [setModal])

  const onEdit = React.useCallback(() => {
    setImages(value)
    setModal('preview')
  }, [setModal, setImages, value])

  const onEditImage = React.useCallback(
    (data: ImageUploadData) => {
      edit.current = data
      setModal('edit')
    },
    [setModal],
  )

  const onClose = React.useCallback(() => {
    setModal(null)
  }, [setModal])

  const onSavePreview = React.useCallback(async () => {
    setModal('upload')
  }, [setModal])

  const onUploadSuccess = React.useCallback(
    async (_images: ImageUploadData[]) => {
      setValue(_images)
      setModal(null)
    },
    [setModal, setValue],
  )

  const onUploadFail = React.useCallback(async () => {
    setModal('preview')
  }, [setModal, setValue])

  const singleClass = maxAmount === 1 ? 'single' : ''

  return (
    <Wrap className={`${errorClass} ${className}`} data-testid="multiFileInput">
      <SLegend className="label" data-testid="multiInputLegend">
        {label}
      </SLegend>
      {description && (
        <Description className={'description'}>{description}</Description>
      )}
      <SPreviewList className={singleClass} cover={cover} images={value} />
      {value.length === 0 ? (
        <AddPhotosButton single={maxAmount === 1} onClick={onAdd} />
      ) : (
        <SBlueButton type="button" onClick={onEdit}>
          EDIT {maxAmount === 1 ? 'PHOTO' : 'PHOTOS'}
        </SBlueButton>
      )}
      <PreviewModal
        images={images}
        onClose={onClose}
        amount={maxAmount}
        isOpen={modal === 'preview'}
        setImages={onUpdateImages}
        onSave={onSavePreview}
        onEdit={onEditImage}
        onMore={onAdd}
      />
      <ImageModal
        aspect={aspect}
        single={maxAmount === 1}
        onClose={onClose}
        isOpen={modal === 'crop'}
        onSave={onSave}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
      />
      <UploadModal
        isOpen={modal === 'upload'}
        onSuccess={onUploadSuccess}
        onClose={onClose}
        onUpload={onUpload}
        onFail={onUploadFail}
        images={images}
      />
      <EditImageModal
        isOpen={modal === 'edit'}
        aspect={aspect}
        image={edit.current}
        onClose={onClose}
        onSave={onEditSave}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
      />
      <Error data-testid="inputFieldError" className={`${errorClass}`}>
        <StyledX red />
        {error}
      </Error>
    </Wrap>
  )
}
FileInput.displayName = 'FileInput'
