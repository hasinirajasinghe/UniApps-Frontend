import React from "react";

const Application = ({ application }) => {
    return (
      <tbody style={{fontSize:"12px", fontFamily:"sans-serif"}}>
          <tr>
              <td>{application.applicant}</td>
              <td>{application.academic_year}</td>
              <td>{application.intended_start}</td>
              <td>{application.intended_major}</td>
              <td>{application.status}</td>
              <td>{application.last_updated}</td>
              <td>
                  <a href="/edit-applicant">Edit</a> 
              </td>
              <td>
                  <a href="/delete-applicant">Delete</a> 
              </td>
          </tr>
      </tbody>
    );
};

export default Application;
