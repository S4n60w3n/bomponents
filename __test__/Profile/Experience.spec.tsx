import React from 'react'

import { render } from '../../testUtils'
import { Experience } from '../../components/Profile/Experience'

const ID = 'experience'
const TITLE_ID = 'experience-title'
const POSITION_ID = 'experience-position'
const TIME_ID = 'experience-time'
const DESCRIPTION_ID = 'experience-description'
const TECHNOLOGY_ID = 'experience-technology'

describe('experience', () => {
  it('default', () => {
    const data = [
      {
        title: 'Title',
        position: 'Position',
        fromDate: new Date('2020-02-1'),
        description: ['desc 1', 'desc 2'],
        technologies: ['tech-1', 'tech-2'],
      },
      {
        title: 'Title2',
        position: 'Position2',
        fromDate: new Date('2019-02-1'),
        toDate: new Date('2019-08-1'),
        description: ['desc2 1'],
        technologies: ['tech2-1', 'tech2-2'],
      },
    ]
    const { getAllByTestId } = render(<Experience data={data} />)

    getAllByTestId(TITLE_ID).forEach((elem, i) => {
      expect(elem).toHaveTextContent(data[i].title)
    })
    getAllByTestId(POSITION_ID).forEach((elem, i) => {
      expect(elem).toHaveTextContent(data[i].position)
    })
    const timeElems = getAllByTestId(TIME_ID)
    expect(timeElems[0]).toHaveTextContent('Feb 2020 - Present')
    expect(timeElems[1]).toHaveTextContent('Feb 2019 - Aug 2019')

    const descElems = getAllByTestId(DESCRIPTION_ID)
    descElems.slice(0, data[0].description.length).forEach((elem, i) => {
      expect(elem).toHaveTextContent(data[0].description[i])
    })

    descElems
      .slice(
        data[0].description.length,
        data[0].description.length + data[1].description.length,
      )
      .forEach((elem, i) => {
        expect(elem).toHaveTextContent(data[1].description[i])
      })

    const techElems = getAllByTestId(TECHNOLOGY_ID)
    techElems.slice(0, data[0].technologies.length).forEach((elem, i) => {
      expect(elem).toHaveTextContent(data[0].technologies[i])
    })

    techElems
      .slice(
        data[0].technologies.length,
        data[0].technologies.length + data[1].technologies.length,
      )
      .forEach((elem, i) => {
        expect(elem).toHaveTextContent(data[1].technologies[i])
      })
  })

  it('className', () => {
    const className = 'className'
    const { getByTestId } = render(
      <Experience data={[]} className={className} />,
    )
    expect(getByTestId(ID)).toHaveClass(className)
  })
})
