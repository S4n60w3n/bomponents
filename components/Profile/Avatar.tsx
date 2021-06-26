import React, { HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLImageElement> & {
  src: string
  alt: string
}

export const Avatar: React.FC<Props> = ({ className, ...props }) => {
  return (
    <img
      data-testid="avatar"
      {...props}
      className={`rounded-full w-32 h-32 object-cover ${className}`}
    />
  )
}
