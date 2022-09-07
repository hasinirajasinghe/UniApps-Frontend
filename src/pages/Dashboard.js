import React from "react";
import Applicants from "../components/Applicants";
import Applications from "../components/Applications";

const Dashboard = ({ applicants, applications }) => {
    return (
        <div>
            <Applicants applicants={applicants} />
            <Applications applications={applications} />
        </div>
    )
}

export default Dashboard;
