import React from 'react'

type Props = {
  className?: string
  fullName: string
  description: string
  avatar: string
  background: string
}

export const Header: React.FC<Props> = ({
  className,
  avatar,
  description,
  background,
  fullName,
}) => {
  return (
    <section
      data-testid="header"
      className={`rounded-lg w-full h-full shadow-lg overflow-hidden ${className}`}
    >
      <img
        src={background}
        alt={`${fullName} background picture`}
        data-testid="header-bg"
        className="w-full h-64 object-cover object-center md:h-72"
      />
      <img
        src={avatar}
        alt={`${fullName} profile picture`}
        data-testid="header-avatar"
        className="rounded-full w-32 h-32 object-cover object-center mx-auto -mt-16 md:mx-12"
      />
      <div className="px-6 pb-10 pt-4 relative flex flex-col items-start md:px-12">
        <h1
          data-testid="header-title"
          className="text-3xl text-gray-800 mb-3 w-full text-left"
        >
          {fullName}
        </h1>
        <p
          data-testid="header-paragraph"
          className="text-sm text-gray-600 leading-tight relative w-full text-left md:w-1/2"
        >
          {description}
        </p>
      </div>
    </section>
  )
}
