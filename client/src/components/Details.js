import React from 'react'

const Details = ({data, closePanel}) => {
    console.log(data);
    const project = data.Project;
    const tech = data.Technical_Skillset;
    const others = data.Other_Information;
  return (
    <div className='details'>
        <div className='closebtn' onClick={() => closePanel()}>x</div>
        <div className='content'>
            <h2>{project.Title}</h2>
            <br></br>
            <div className='rowCard'>
                <h4>Technologies Used:</h4>
                <p>{project.Technologies}</p>
            </div>
            <div className='rowCard'>
                <h4>Technical Skills:</h4>
                {
                    Object.entries(tech).map(([k, v])=>{
                        return <div className='techDetail'>
                            <h6>{k}</h6>
                            <p>{v}</p>
                        </div> 
                        
                    })
                }
            </div>
            <div className='rowCard'>
                <h4>Availability</h4>
                <p>{others.Availability}</p>
            </div>
        </div>
    </div>
  )
}

export default Details