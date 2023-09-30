import React from 'react'

const Card = ({project, handleToggle}) => {
  return (
    <div className='Card' onClick={()=>{handleToggle(project._id)}}>
        <h3 className='projectTitle'>{project.Project.Title}</h3>
    </div>
  )
}

export default Card