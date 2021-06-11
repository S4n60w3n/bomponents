import React from 'react'
import styled, { css } from 'styled-components'

import { pxToRem } from '../../../utils/utils'
import {
  ACCEPT_TYPE,
  getDropData,
  getUploadData,
  preventAll,
} from './FileUploadUtils'

const Wrap = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const UploadText = styled.h4(
  ({ theme }) => css`
    margin: 0;
    color: ${theme.color.dark};
    font-size: ${pxToRem(14)};
    font-weight: ${theme.font.weight.semibold};
  `,
)

const SInput = styled.input`
  position: absolute;
  opacity: 0;
  left: 0;
  cursor: pointer;
  top: 0;
  width: 100%;
  height: 100%;
`

const FakeInputButton = styled.div(
  ({ theme }) => css`
    line-height: 1;
    position: relative;
    color: ${theme.color.white};
    background-color: ${theme.color.blue};
    font-size: ${pxToRem(16)};
    padding: ${pxToRem(15, 40)};
    margin-bottom: ${pxToRem(15)};

    :hover {
      background-color: ${theme.color.lightBlue};
    }
  `,
)

type Props = {
  single?: boolean
  className?: string
  onUpload(urls: string[]): void
}

export const FileUpload: React.FC<Props> = ({
  className,
  onUpload,
  single,
}) => {
  const [drag, setDrag] = React.useState(false)
  const [loading, setLoading] = React.useState(false)

  const onDragEnter = React.useCallback(
    (ev: React.DragEvent<HTMLInputElement>) => {
      preventAll(ev)
      setDrag(true)
    },
    [setDrag],
  )

  const onDragLeave = React.useCallback(
    (ev: React.DragEvent<HTMLInputElement>) => {
      preventAll(ev)
      setDrag(false)
    },
    [setDrag],
  )

  const onDrop = React.useCallback(
    async (ev: React.DragEvent<HTMLInputElement>) => {
      preventAll(ev)
      if (loading) {
        return
      }
      setDrag(false)
      setLoading(true)

      onUpload(await getDropData(ev, single))

      setLoading(false)
    },
    [onUpload, setDrag, setLoading, loading, single, getDropData],
  )

  const onFileUpload = React.useCallback(
    async (ev: React.ChangeEvent<HTMLInputElement>) => {
      preventAll(ev)
      if (loading) {
        return
      }
      setLoading(true)
      setDrag(false)

      onUpload(await getUploadData(ev, single))

      setLoading(false)
    },
    [onUpload, setDrag, setLoading, loading, single, getUploadData],
  )

  let text = single ? 'or drag photo here' : 'or drag photos here'
  if (drag) {
    text = 'Drop here'
  }

  return (
    <Wrap
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      onDragOver={preventAll}
      onDragLeave={onDragLeave}
      className={className}
      data-testid="fileUpload"
    >
      <FakeInputButton>
        <SInput
          data-testid="fileUploadInput"
          accept={ACCEPT_TYPE.join(',')}
          type="file"
          multiple={!single}
          onChange={onFileUpload}
        />
        UPLOAD {single ? 'PHOTO' : 'PHOTOS'}
      </FakeInputButton>
      <UploadText>{text}</UploadText>
    </Wrap>
  )
}
FileUpload.displayName = 'FileUpload'
