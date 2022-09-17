import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const Analytics = ({ applicants, applications }) => {
    ChartJS.register(ArcElement, Tooltip, Legend);

    //  PIE CHART 1 for enrollment status 

    // Create object to hold data for how many applicants there are for a given status
    let applicant_enrollment_status_data = {};

    applicants.forEach((applicant) => {
        // Second time through if we find an applicant that we've seen the status of we'll increment it in our data object by one
        if (applicant.enrollment_status in applicant_enrollment_status_data) {
            applicant_enrollment_status_data[applicant.enrollment_status] += 1;
        } else {
            // First time seeing a new status we'll create new key in the data array and set it to one to represent that we have one applicant with this status
            applicant_enrollment_status_data[applicant.enrollment_status] = 1;
        }
    });

    applicant_enrollment_status_data = Object.entries(
        applicant_enrollment_status_data
    );
    let applicant_enrollment_status_data_labels =
        applicant_enrollment_status_data.map(([key, value]) => {
            return key;
        });

    let applicant_enrollment_status_data_values =
        applicant_enrollment_status_data.map(([key, value]) => {
            return value;
        });

    const APPLINCANT_COLORS = [
        "#2778b4",
        "#33a02c",
        "#f77f03"
    ];

    applicant_enrollment_status_data = {
        labels: applicant_enrollment_status_data_labels,
        datasets: [
            {
                label: "# of applicants by status",
                data: applicant_enrollment_status_data_values,
                backgroundColor: APPLINCANT_COLORS,
                borderColor: APPLINCANT_COLORS,
                borderWidth: 1,
            },
        ],
    };

    // PIE CHART 2  for application status 

    let application_status_data = {};

    applications.forEach((application) => {
        if (application.status in application_status_data) {
            application_status_data[application.status] += 1;
        } else {
            // First time seeing a new status we'll create new key in the data array and set it to one to represent that we have one applicant with this status
            application_status_data[application.status] = 1;
        }
    });

    application_status_data = Object.entries(
        application_status_data
    );

    let application_status_data_labels =
    application_status_data.map(([key, value]) => {
            return key;
        });

    let application_status_data_values =
    application_status_data.map(([key, value]) => {
            return value;
        });

    const APPLICATION_COLORS = [
        '#a6cee3', 
        '#2778b4', 
        '#b2df8a', 
        '#33a02c',
        '#f89a99',
        '#e31a1d',
        '#fabf6f',
        '#f77f03'
    ];

    application_status_data = {
        labels: application_status_data_labels,
        datasets: [
            {
                label: "# of applications by status",
                data: application_status_data_values,
                backgroundColor: APPLICATION_COLORS,
                borderColor: APPLICATION_COLORS,
                borderWidth: 1,
            },
        ],
    };

    // Pie Chart 3 for application terms 

    let application_term_data = {};

    applications.forEach((application) => {
        if (application.intended_start in application_term_data) {
          application_term_data[application.intended_start] += 1;
        } else {
            // First time seeing a new status we'll create new key in the data array and set it to one to represent that we have one applicant with this status
            application_term_data[application.intended_start] = 1;
        }
    });

    application_term_data = Object.entries(
      application_term_data
    );

    let application_term_data_labels =
    application_term_data.map(([key, value]) => {
            return key;
        });

    let application_term_data_values =
    application_term_data.map(([key, value]) => {
            return value;
        });

    const TERM_COLORS = [
        '#f77f03',
        '#e31a1d',
        '#33a02c',
        '#2778b4',  
    ];

    application_term_data = {
        labels: application_term_data_labels,
        datasets: [
            {
                label: "# of applications by status",
                data: application_term_data_values,
                backgroundColor: TERM_COLORS,
                borderColor: TERM_COLORS,
                borderWidth: 1,
            },
        ],
    };

    // Percentage converter for pie charts 
    const option = {
        maintainAspectRatio: true,
        title: {
          display: true,
          text: "Selected",
          fontSize: 20
        },
        legend: {
          labels: {
            fontSize: 25
          },
          position: 'bottom',
        },
        plugins: {
          datalabels: {
            backgroundColor: function (context) {
              return context.dataset.backgroundColor;
            },
            formatter: (val, context) =>
              `${
                (Number(val) * 100) /
                context.chart.data.datasets[context.datasetIndex].data.reduce(
                  (a, b) => Number(a) + Number(b),
                  0
                )
              }%`,
            borderRadius: 25,
            borderWidth: 3,
            color: "black",
            font: {
              weight: "bold"
            },
            padding: 6
          },

          tooltip: {
            callbacks: {
              label: (ttItem) =>
                `${ttItem.label}: ${
                  ((ttItem.parsed * 100) /
                  ttItem.dataset.data.reduce(
                    (a, b) => Number(a) + Number(b),
                    0
                  )).toFixed(2)
                }%`
            }
          }
        }
      }

    return (
        <div className="analytics-main-container">
            <div className="analytics-header-container ">
                <h1 className="analytics-header-container h1">Analytics</h1>
            </div>
            <div className="shadow-lg p-3 mb-5 bg-white analytics-charts-container">
                <div className="analytics-sub-containers">
                    <h3>Enrollment Status</h3>
                    <Pie data={applicant_enrollment_status_data} options={option} />
                </div>
                <div className="analytics-sub-containers">
                    <h3>Application Status</h3>
                    <Pie data={application_status_data} options={option}/>
                </div>
                <div className="analytics-sub-containers">
                    <h3>Term Status</h3>
                    <Pie data={application_term_data} options={option}/>
                </div>
            </div>
        </div>
    );
};

export default Analytics;

// Resources
// Pie chart percentage conversion 
// https://stackoverflow.com/questions/69361448/how-can-i-display-the-percentage-inside-the-graph-and-on-hover