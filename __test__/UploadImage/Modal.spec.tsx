import React from 'react'

import { Modal } from '../../components/UploadImage/Modal/Modal'
import { render, fireEvent } from '../../testUtils'

const X_ID = 'modalX'

describe('Modal', () => {
  it('default', () => {
    const { getByTestId } = render(
      <Modal isOpen onClose={() => {}}>
        <div data-testid="test" />
      </Modal>,
    )

    expect(getByTestId('test')).toBeTruthy()
  })

  it('closed', () => {
    const { queryByTestId } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <div data-testid="test" />
      </Modal>,
    )

    expect(queryByTestId('test')).not.toBeTruthy()
  })

  it('X', () => {
    const spy = jest.fn()
    const { getByTestId } = render(<Modal isOpen onClose={spy} />)
    fireEvent.click(getByTestId(X_ID))
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('className', () => {
    const className = 'className'
    const { getByRole } = render(
      <Modal isOpen onClose={() => {}} className={className} />,
    )
    expect(getByRole('dialog').className.includes(className)).toBeTruthy()
  })
})
