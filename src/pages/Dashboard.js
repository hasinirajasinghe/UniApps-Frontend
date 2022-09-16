import React, { useEffect, useRef } from "react";
import Analytics from "../components/Analytics";
import Applicants from "../components/Applicants";
import Applications from "../components/Applications";

const Dashboard = ({
    applicants,
    applications,
    deleteApplicant,
    deleteApplication,
}) => {
    const majors = useRef([]);
    const enrollment_statuses = useRef([]);
    const terms = useRef([]);
    const application_statuses = useRef([]);

    useEffect(() => {
        fetch("https://uni-apps.herokuapp.com/majors/")
            .then((res) => res.json())
            .then((data) => (majors.current = data))
            .catch((error) => console.log(error));

        fetch("https://uni-apps.herokuapp.com/application-statuses/")
            .then((res) => res.json())
            .then((data) => (application_statuses.current = data))
            .catch((error) => console.log(error));

        fetch("https://uni-apps.herokuapp.com/enrollment-statuses/")
            .then((res) => res.json())
            .then((data) => (enrollment_statuses.current = data))
            .catch((error) => console.log(error));

        fetch("https://uni-apps.herokuapp.com/terms/")
            .then((res) => res.json())
            .then((data) => (terms.current = data))
            .catch((error) => console.log(error));
    });

    return (
        <div>
            <Analytics applicants={applicants} applications={applications} />
            <Applicants
                applicants={applicants}
                majors={majors}
                enrollment_statuses={enrollment_statuses}
                deleteApplicant={deleteApplicant}
            />
            <Applications
                applicants={applicants}
                applications={applications}
                majors={majors}
                terms={terms}
                application_statuses={application_statuses}
                deleteApplication={deleteApplication}
            />
        </div>
    );
};

export default Dashboard;
