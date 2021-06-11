import React from 'react'

type Props = {}

export const Chevron: React.FC<Props> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full block"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}
Chevron.displayName = 'Chevron'
