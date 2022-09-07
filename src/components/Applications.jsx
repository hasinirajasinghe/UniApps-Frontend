import React from 'react'
import Application from './Application'

const Applications = ({applications}) => {
  return (
    <div>
        <div>
            <h1>Applications</h1>
            <a href="/new-application">+</a>
        </div>
        <div>
            {applications.map((application) => {
                return (
                    <Application application={application} key={application.id}/>
                )
            })}
        </div>
    </div>
  )
}

export default Applications