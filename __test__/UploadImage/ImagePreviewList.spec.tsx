import React from 'react'
import { fireEvent } from '@testing-library/dom'

import { render } from '../../testUtils'
import { DELETE_ID, EDIT_ID, IMAGE_ID as PREVIEW_ID } from './ImagePreview.spec'
import { PreviewList } from '../../components/UploadImage/Preview/PreviewList'

const ID = 'imagePreviewList'

describe('ImagePreviewList', () => {
  it('default', () => {
    const images = [
      { key: '1', data: null, url: 'imageUrl' },
      { key: '2', data: null, url: 'imageUrl2' },
      { key: '3', data: null, url: 'imageUrl3' },
    ] as any
    const { getAllByTestId } = render(
      <PreviewList onEdit={() => {}} onDelete={() => {}} images={images} />,
    )

    getAllByTestId(PREVIEW_ID).forEach((elem, i) => {
      expect(elem).toHaveAttribute('src', images[i].url)
    })
  })

  it('cover', () => {
    const images = [
      { key: '1', data: null, url: 'imageUrl' },
      { key: '2', data: null, url: 'imageUrl2' },
      { key: '3', data: null, url: 'imageUrl3' },
    ] as any
    const { getByTestId } = render(
      <PreviewList
        cover
        onEdit={() => {}}
        onDelete={() => {}}
        images={images}
      />,
    )

    expect(getByTestId(ID)).toHaveTextContent('COVER PHOTO')
  })

  it('onEdit', () => {
    const images = [
      { key: '1', data: null, url: 'imageUrl' },
      { key: '2', data: null, url: 'imageUrl2' },
      { key: '3', data: null, url: 'imageUrl3' },
    ] as any
    const spy = jest.fn()
    const { getAllByTestId } = render(
      <PreviewList onEdit={spy} onDelete={() => {}} images={images} />,
    )

    fireEvent.click(getAllByTestId(EDIT_ID)[1])
    expect(spy).toBeCalledWith(1)
  })

  it('onDelete', () => {
    const images = [
      { key: '1', data: null, url: 'imageUrl' },
      { key: '2', data: null, url: 'imageUrl2' },
      { key: '3', data: null, url: 'imageUrl3' },
    ] as any
    const spy = jest.fn()
    const { getAllByTestId } = render(
      <PreviewList onEdit={() => {}} onDelete={spy} images={images} />,
    )

    fireEvent.click(getAllByTestId(DELETE_ID)[2])
    expect(spy).toBeCalledWith(2)
  })

  it('className', () => {
    const className = 'className'
    const { baseElement } = render(
      <PreviewList
        onEdit={() => {}}
        onDelete={() => {}}
        images={[]}
        className={className}
      />,
    )
    expect(baseElement.getElementsByClassName(className).length).toBe(1)
  })
})
