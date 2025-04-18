import * as React from 'react'

const AvatarProject = ({ className }: React.ComponentProps<'div'>) => {
  return (
    <svg height='100%' viewBox='0 0 24 24' className={className}>
      <path
        fill='var(--tile-color,#1868db)'
        d='M0 6a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z'
      ></path>
      <path
        fill='var(--icon-color, white)'
        d='M8.974 15.524H7.62c-2.04 0-3.502-1.25-3.502-3.079h7.271c.377 0 .62.268.62.647v7.317c-1.817 0-3.036-1.472-3.036-3.524zm3.591-3.636h-1.352c-2.04 0-3.503-1.227-3.503-3.056h7.272c.376 0 .642.245.642.624v7.317c-1.818 0-3.059-1.472-3.059-3.524zm3.614-3.614h-1.353c-2.04 0-3.502-1.25-3.502-3.079h7.271c.377 0 .62.268.62.625v7.317c-1.817 0-3.036-1.472-3.036-3.525z'
      ></path>
    </svg>
  )
}

export default AvatarProject
