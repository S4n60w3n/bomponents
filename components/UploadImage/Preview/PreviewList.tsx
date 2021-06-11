import React from 'react'
import styled, { css } from 'styled-components'
import { ReactSortable } from 'react-sortablejs'

import { Preview } from './Preview'
import { pxToRem } from '../../../utils/utils'
import { ImageUploadData } from '../../../@types/types'

const Label = styled.div(
  ({ theme }) => css`
    font-size: ${pxToRem(16)};
    line-height: 1;
    font-weight: ${theme.font.weight.bold};
    color: ${theme.color.dark};
    margin-bottom: ${pxToRem(8)};
    margin-left: ${pxToRem(4)};
  `,
)

const Grid = styled(ReactSortable)(
  ({ theme }) => css`
    display: grid;
    flex-wrap: wrap;
    position: relative;
    gap: ${pxToRem(42)};
    grid-template-columns: 1fr 1fr 1fr 1fr;
    width: 100%;

    @media only screen and (max-width: ${theme.breakpoint.tabletH}) {
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media only screen and (max-width: ${theme.breakpoint.tabletV}) {
      grid-template-columns: 1fr 1fr;
    }

    &.cover {
      > *:first-of-type {
        grid-column: 1 / 5;
        max-width: ${pxToRem(280)};

        @media only screen and (max-width: ${theme.breakpoint.tabletH}) {
          grid-column: 1 / 4;
        }

        @media only screen and (max-width: ${theme.breakpoint.tabletV}) {
          grid-column: 1 / 3;
          max-width: none;
        }
      }
    }
  `,
)

const NonSortable: React.FC<any> = ({ children, className }) => {
  return (
    <Grid as="div" className={className}>
      {children}
    </Grid>
  )
}

type Props = {
  cover?: boolean
  coverText?: string
  onEdit?(index: number): void
  onDelete?(index: number): void
  onSort?(data: ImageUploadData[]): void
  images: ImageUploadData[]
  className?: string
}

export const PreviewList: React.FC<Props> = ({
  className = '',
  onEdit,
  onDelete,
  onSort,
  coverText = 'COVER PHOTO',
  images,
  cover,
}) => {
  const coverClass = cover ? 'cover' : ''

  return (
    <div data-testid="imagePreviewList" className={className}>
      {cover && images.length > 0 && (
        <Label className="coverLabel">{coverText}</Label>
      )}
      <Grid
        as={onSort ? ReactSortable : NonSortable}
        className={`grid ${coverClass}`}
        list={images}
        animation={250}
        setList={onSort}
      >
        {images?.map(({ key, url }, index) => (
          <Preview
            key={key}
            src={url}
            alt={`Image preview number ${index}`}
            onEdit={
              onEdit &&
              (() => {
                onEdit(index)
              })
            }
            onDelete={
              onDelete &&
              (() => {
                onDelete(index)
              })
            }
          />
        ))}
      </Grid>
    </div>
  )
}
PreviewList.displayName = 'ImagePreviewList'
