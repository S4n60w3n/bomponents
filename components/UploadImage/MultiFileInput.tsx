import React from 'react'
import styled, { css } from 'styled-components'
import { useField } from 'formik'

import { pxToRem } from '../../utils/utils'
import { ImageUploadData } from '../../@types/types'
import { BlueButton, Button } from '../common/Button'
import { X } from '../icons/X'
import { ImageModal } from './Modal/ImageModal'
import { EditImageModal } from './Modal/EditImageModal'
import { PreviewList } from './Preview/PreviewList'
import { PreviewModal } from './Modal/PreviewModal'

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
`

type OpenModal = 'upload' | 'preview' | 'edit' | null

type Props = {
  label: string
  name: string
  maxAmount?: number
  description?: string
  cover?: boolean
  aspect: number
  maxWidth?: number
  maxHeight?: number
  className?: string
}

export const MultiFileInput: React.FC<Props> = ({
  label,
  name,
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
  const errorClass = Boolean(error && touched) ? 'error ' : ''

  const onUpload = React.useCallback(
    (values: ImageUploadData[]) => {
      if (maxAmount) {
        setValue(value.slice(0, maxAmount))
      } else {
        setValue(values)
      }
      setModal('preview')
    },
    [setModal, setValue, maxAmount],
  )

  const onEditSave = React.useCallback(
    (data: ImageUploadData) => {
      value.reduce(
        (res, { key, ...rest }) => [
          ...res,
          key === data.key ? data : { key, ...rest },
        ],
        [] as ImageUploadData[],
      )
      setModal('preview')
    },
    [value],
  )

  const onAdd = React.useCallback(() => {
    setModal('upload')
  }, [setModal])

  const onEdit = React.useCallback(() => {
    setModal('preview')
  }, [setModal])

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

  return (
    <Wrap className={`${errorClass} ${className}`} data-testid="multiFileInput">
      <SLegend className="label" data-testid="multiInputLegend">
        {label}
      </SLegend>
      {description && (
        <Description className={'description'}>{description}</Description>
      )}
      <SPreviewList cover={cover} images={value} />
      {value.length === 0 ? (
        <Button onClick={onAdd}>Add</Button>
      ) : (
        <SBlueButton type="button" onClick={onEdit}>
          EDIT PHOTOS
        </SBlueButton>
      )}
      <PreviewModal
        images={value}
        onClose={onClose}
        amount={maxAmount}
        isOpen={modal === 'preview'}
        setImages={setValue}
        onSave={onClose}
        onEdit={onEditImage}
        onMore={onAdd}
      />
      <ImageModal
        aspect={aspect}
        single={false}
        onClose={onClose}
        isOpen={modal === 'upload'}
        onSave={onUpload}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
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
MultiFileInput.displayName = 'MultiFileInput'