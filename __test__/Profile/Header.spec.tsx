import React from 'react'

import { render } from '../../testUtils'
import { Header } from '../../components/Profile/Header'

const ID = 'header'
const AVATAR_ID = 'header-avatar'
const BG_ID = 'header-bg'
const TITLE_ID = 'header-title'
const PARAGRAPH_ID = 'header-paragraph'

describe('Header', () => {
  it('default', () => {
    const avatar = 'imageUrl'
    const bg = 'imageUrl2'
    const fullName = 'Full Name'
    const description = 'Description'
    const { getByTestId } = render(
      <Header
        avatar={avatar}
        background={bg}
        fullName={fullName}
        description={description}
      />,
    )

    expect(getByTestId(AVATAR_ID)).toHaveAttribute('src', avatar)
    expect(getByTestId(AVATAR_ID)).toHaveAttribute(
      'alt',
      `${fullName} profile picture`,
    )
    expect(getByTestId(BG_ID)).toHaveAttribute('src', bg)
    expect(getByTestId(BG_ID)).toHaveAttribute(
      'alt',
      `${fullName} background picture`,
    )
    expect(getByTestId(TITLE_ID)).toHaveTextContent(fullName)
    expect(getByTestId(PARAGRAPH_ID)).toHaveTextContent(description)
  })

  it('className', () => {
    const className = 'className'
    const { getByTestId } = render(
      <Header
        avatar={''}
        background={''}
        fullName=""
        description=""
        className={className}
      />,
    )
    expect(getByTestId(ID)).toHaveClass(className)
  })
})
