import React from 'react'
import { fireEvent } from '@testing-library/dom'

import { render, waitFor } from '../../testUtils'
import { ImageModal } from '../../components/UploadImage/Modal/ImageModal'
import { INPUT_ID } from './FileUpload.spec'

describe('ImageModal', () => {
  it('default', async () => {
    const image = '123'
    const spy = jest.fn()
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
    global.URL.createObjectURL = jest.fn(() => image)
    const { getByTestId } = render(
      <ImageModal
        isOpen
        onClose={() => {}}
        onSave={spy}
        aspect={1}
        maxHeight={2}
        maxWidth={3}
      />,
    )

    await waitFor(() =>
      fireEvent.change(getByTestId(INPUT_ID), {
        target: { files: [file] },
      }),
    )
  })

  it('className', async () => {
    const className = 'className'
    const { getByRole } = render(
      <ImageModal
        isOpen
        onClose={() => {}}
        onSave={() => {}}
        aspect={1}
        maxHeight={2}
        maxWidth={3}
        className={className}
      />,
    )
    await waitFor(() => expect(getByRole('dialog')).toHaveClass(className))
  })
})
