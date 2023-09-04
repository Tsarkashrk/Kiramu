import React from 'react'

const Heading = (props) => {
  return (
    <div className='heading'>
      <h2 className='heading__title'>{props.title}</h2>
      <p className='heading__description'>{props.description}</p>
    </div>
  )
}

export default Heading;