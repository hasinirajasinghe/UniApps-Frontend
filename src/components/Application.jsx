import React from "react";
import Table from "react-bootstrap/Table";

const Application = ({ application }) => {
    return (
      <tbody>
          <tr>
              <th>{application.applicant}</th>
              <td>{application.academic_year}</td>
              <td>{application.intended_start}</td>
              <td>{application.intended_major}</td>
              <td>{application.status}</td>
              <td>{application.last_updated}</td>
              <td>{application.school_last_attended}</td>
              <td>{application.gpa}</td>
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
