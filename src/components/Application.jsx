import React from 'react'

const Application = ({application}) => {

  return (
    <div class="border border-secondary">
        <div>
            <h3>{application.applicant}</h3>
            <h4>{application.academic_year}</h4>
            <h4>{application.intended_start}</h4>
            <h4>{application.intended_major}</h4>
            <p>{application.status}</p>
            <p>{application.last_updated}</p>
            <p>{application.school_last_attended}</p>
            <p>{application.gpa}</p>
        </div>
    </div>
  )
}

export default Application