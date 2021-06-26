import React from 'react'

import { render } from '../../testUtils'
import { Avatar } from '../../components/Profile/Avatar'

const ID = 'avatar'

describe('Avatar', () => {
  it('default', () => {
    const image = 'imageUrl'
    const alt = 'imageAlt'
    const { getByTestId } = render(<Avatar src={image} alt={alt} />)

    expect(getByTestId(ID)).toHaveAttribute('src', image)
    expect(getByTestId(ID)).toHaveAttribute('alt', alt)
  })

  it('className', () => {
    const className = 'className'
    const { getByTestId } = render(
      <Avatar src={''} alt={''} className={className} />,
    )
    expect(getByTestId(ID)).toHaveClass(className)
  })
})
