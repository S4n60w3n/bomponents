import React from 'react'
import { fireEvent } from '@testing-library/dom'

import { render } from '../../testUtils'
import { Preview } from '../../components/UploadImage/Preview/Preview'

const ID = 'imagePreview'
export const IMAGE_ID = 'imagePreviewImage'
export const EDIT_ID = 'imagePreviewEdit'
export const DELETE_ID = 'imagePreviewDelete'

describe('ImagePreview', () => {
  it('default', () => {
    const image = 'imageUrl'
    const alt = 'imageAlt'
    const { getByTestId } = render(
      <Preview onEdit={() => {}} onDelete={() => {}} src={image} alt={alt} />,
    )

    expect(getByTestId(IMAGE_ID)).toHaveAttribute('src', image)
    expect(getByTestId(IMAGE_ID)).toHaveAttribute('alt', alt)
  })

  it('onEdit', () => {
    const spy = jest.fn()
    const { getByTestId } = render(
      <Preview onEdit={spy} onDelete={() => {}} src={''} alt={''} />,
    )

    fireEvent.click(getByTestId(EDIT_ID))

    expect(spy).toBeCalledTimes(1)
  })

  it('onDelete', () => {
    const spy = jest.fn()
    const { getByTestId } = render(
      <Preview onEdit={() => {}} onDelete={spy} src={''} alt={''} />,
    )

    fireEvent.click(getByTestId(DELETE_ID))

    expect(spy).toBeCalledTimes(1)
  })

  it('className', () => {
    const className = 'className'
    const { getByTestId } = render(
      <Preview
        onEdit={() => {}}
        onDelete={() => {}}
        src={''}
        alt={''}
        className={className}
      />,
    )
    expect(getByTestId(ID)).toHaveClass(className)
  })
})
