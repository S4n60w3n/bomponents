import React from 'react'

import { ImageCrop } from '../../components/UploadImage/ImageCrop/ImageCrop'
import { render } from '../../testUtils'

export const ID = 'imageCrop'
export const IMAGE_ID = 'imageCropImage'
export const BUTTON_ID = 'imageCropButton'

describe('ImageCrop', () => {
  it('default', () => {
    const image = '123'
    const { getByTestId } = render(
      <ImageCrop
        onSave={() => {}}
        image={image}
        aspect={1}
        maxWidth={1}
        maxHeight={1}
      />,
    )

    expect(getByTestId(IMAGE_ID)).toHaveAttribute('src', image)
  })

  it('className', () => {
    const className = 'className'
    const { getByTestId } = render(
      <ImageCrop
        onSave={() => {}}
        image={'123'}
        aspect={1}
        maxWidth={1}
        maxHeight={1}
        className={className}
      />,
    )
    expect(getByTestId(ID)).toHaveClass(className)
  })
})
