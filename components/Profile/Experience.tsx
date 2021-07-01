import { format } from 'date-fns'
import React from 'react'

const DATE_FORMAT = 'MMM yyy'

type Data = {
  title: string
  position: string
  fromDate: Date
  toDate?: Date
  description: string[]
  technologies: string[]
}

type Props = {
  data: Data[]
  className?: string
}

export const Experience: React.FC<Props> = ({ data, className }) => {
  return (
    <section
      data-testid="experience"
      className={`rounded-lg w-full h-full shadow-lg overflow-hidden p-6 md:p-12 ${className}`}
    >
      <h2 className="text-3xl text-gray-800 w-full text-left">Experience:</h2>
      <ul>
        {data.map(
          ({
            title,
            position,
            fromDate,
            toDate,
            description,
            technologies,
          }) => (
            <li
              className="border-t-2 border-gray-100 pt-4 mt-4"
              key={`${title}-${position}`}
            >
              <h3
                data-testid="experience-title"
                className="text-xl text-gray-700 w-full text-left"
              >
                {title}
              </h3>
              <p
                data-testid="experience-position"
                className="text-md text-gray-600 w-full text-left"
              >
                {position}
              </p>
              <p
                data-testid="experience-time"
                className="text-md text-gray-600 w-full text-left"
              >
                {format(fromDate, DATE_FORMAT)} -{' '}
                {toDate ? format(toDate, DATE_FORMAT) : 'Present'}
              </p>
              <ul className="text-sm mt-2 text-gray-600 w-full text-left pl-2">
                {description.map((item, i) => (
                  <li
                    data-testid="experience-description"
                    key={`desciption-${i}`}
                    className="list-disc list-inside"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <h4 className="text-sm font-semibold mr-2 text-gray-400 mt-3">
                Technologies:
              </h4>
              <ul className="text-sm text-gray-400 leading-none">
                {technologies.map((item, i) => (
                  <li
                    data-testid="experience-technology"
                    className="inline mr-1"
                    key={item}
                  >
                    {item}
                    {i < technologies.length - 1 && ', '}
                  </li>
                ))}
              </ul>
            </li>
          ),
        )}
      </ul>
    </section>
  )
}
Experience.displayName = 'Experience'
