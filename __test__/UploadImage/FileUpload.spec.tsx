import React from 'react'
import { fireEvent } from '@testing-library/dom'

import { render, waitFor } from '../../testUtils'
import { FileUpload } from '../../components/UploadImage/FileUpload/FileUpload'

export const ID = 'fileUpload'
export const INPUT_ID = 'fileUploadInput'

describe('FileUpload', () => {
  it('default', () => {
    const { getByTestId } = render(<FileUpload onUpload={() => {}} />)

    expect(getByTestId(ID)).toHaveTextContent(
      'UPLOAD PHOTOSor drag photos here',
    )
  })

  it('single', () => {
    const { getByTestId } = render(<FileUpload single onUpload={() => {}} />)

    expect(getByTestId(ID)).toHaveTextContent('UPLOAD PHOTOor drag photo here')
  })

  it('upload', async () => {
    const spy = jest.fn()
    const fileUrl = 'fileUrl'
    global.URL.createObjectURL = jest.fn(() => fileUrl)
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
    const { getByTestId } = render(<FileUpload single onUpload={spy} />)

    await waitFor(() =>
      fireEvent.change(getByTestId(INPUT_ID), {
        target: { files: [file] },
      }),
    )

    expect(spy).toHaveBeenCalledWith([fileUrl])
  })

  it('upload multiple', async () => {
    const spy = jest.fn()
    const fileUrl = 'fileUrl'
    global.URL.createObjectURL = jest.fn(() => fileUrl)
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
    const { getByTestId } = render(<FileUpload onUpload={spy} />)

    await waitFor(() =>
      fireEvent.change(getByTestId(INPUT_ID), {
        target: { files: [file, file] },
      }),
    )

    expect(spy).toHaveBeenCalledWith([fileUrl, fileUrl])
  })

  it('upload multiple, single', async () => {
    const spy = jest.fn()
    const fileUrl = 'fileUrl'
    global.URL.createObjectURL = jest.fn(() => fileUrl)
    const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })
    const { getByTestId } = render(<FileUpload single onUpload={spy} />)

    await waitFor(() =>
      fireEvent.change(getByTestId(INPUT_ID), {
        target: { files: [file, file] },
      }),
    )

    expect(spy).toHaveBeenCalledWith([fileUrl])
  })

  it('className', () => {
    const className = 'className'
    const { getByTestId } = render(
      <FileUpload onUpload={() => {}} className={className} />,
    )
    expect(getByTestId(ID).className.includes(className)).toBeTruthy()
  })
})
