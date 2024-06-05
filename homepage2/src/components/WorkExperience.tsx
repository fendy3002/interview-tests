import moment from "dayjs";

export const WorkExperienceDate = (props: { date: Date }) => {
  return (
    <span style={{ fontStyle: "italic", fontSize: "0.9em" }}>
      {moment(props.date).format("YYYY MMM")}
    </span>
  );
};

export const WorkExperienceLine = (
  props: React.PropsWithChildren<{
    company: string;
    periodFrom: Date;
    periodTo?: Date;
    skillSet: string;
  }>
) => {
  return (
    <div style={{}} className="mb-2">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{ fontSize: "1.2em", fontWeight: "bold", marginRight: "8px" }}
        >
          {props.company}
        </div>
        <div>
          <WorkExperienceDate date={props.periodFrom} />
          {" - "}
          {props.periodTo ? (
            <WorkExperienceDate date={props.periodTo} />
          ) : (
            <span
              style={{
                fontStyle: "italic",
                fontSize: "0.9em",
                fontWeight: "bold",
              }}
            >
              PRESENT
            </span>
          )}
        </div>
      </div>
      <div
        style={{ fontStyle: "italic", fontSize: "0.9em", marginBottom: "8px" }}
      >
        {props.skillSet}
      </div>
      {props.children}
    </div>
  );
};
export const WorkExperience = () => {
  return (
    <>
      <div className="section work-experience">
        <h2>Work Experience</h2>
        <WorkExperienceLine
          company="PT. Achilles Financial System"
          periodFrom={new Date(2022, 7, 1)}
          skillSet="Team Lead; NodeJS (NestJS & NextJS), ReactJS, PostgreSQL, Docker, RabbitMQ"
        >
          {"TBD"}
        </WorkExperienceLine>
        <WorkExperienceLine
          company="FWD Insurance - Singapore (Remote)"
          periodFrom={new Date(2022, 2, 1)}
          periodTo={new Date(2022, 6, 1)}
          skillSet="Sr. Software Developer; NodeJS (NestJS & NextJS), ReactJS, PostgreSQL, Docker, RabbitMQ"
        >
          <div>
            {
              "Work in a team of 10 developers to design and develop promotion back office and rest api application"
            }
          </div>
          <ul>
            <li>
              Developed application with NextJS react frontend and NestJS
              microservice backend
            </li>
            <li>
              Designed and suggested git branching strategy, reducing confusion,
              streamlining and improve development and deployment process
            </li>
            <li>
              Developed libraries and development toolings, which increase
              development speed and reliability
            </li>
            <li>
              Initiate PR and code review sessions, increasing code quality and
              reducing issues over time
            </li>
          </ul>
        </WorkExperienceLine>

        <WorkExperienceLine
          company="PT. Anadana Kode Nontunai"
          periodFrom={new Date(2019, 9, 1)}
          periodTo={new Date(2022, 4, 1)}
          skillSet="Sr. Software Developer; NodeJS, ReactJS, MySQL, Git, Docker"
        >
          <div>
            {
              "Led a team of 3 developers to assist the company at developing an e-wallet application. Improving qualities and shortening the development time"
            }
          </div>

          <ul>
            <li>
              Developed an automated transaction simulator; simulating
              day-to-day reports and improving security and business flow
            </li>
            <ul>
              <li>
                It also helps to simulate the reconciliation process with
                accounting dept; reducing their workload
              </li>
            </ul>

            <li>
              Published an account management REST service; enabling
              applications to authenticate via jwt and improving development
              time
            </li>
            <li>
              Delivered point of sales REST service; enabling easier and more
              accurate daily reporting
            </li>
            <li>
              Developed e-wallet back office applications; enabling officers to
              do administration activities with core e-wallet application
            </li>
          </ul>
        </WorkExperienceLine>

        <WorkExperienceLine
          company="PT. Panorama Langit Teknologi"
          periodFrom={new Date(2015, 11, 1)}
          periodTo={new Date(2019, 9, 1)}
          skillSet="Sr. Software Developer; PHP, ReactJS, MySQL, Git, Docker"
        >
          <div>
            {
              "In order to organize the database, the company needs a tool to compare hotel entities between different data sources, which reduces the workload of hotel booking systems"
            }
          </div>

          <ul>
            <li>
              Delivered tool to compare hotels from different data source;
              making it possible to do price comparison and uniformed content
              for each hotel entity across systems and reduce management
              workload
            </li>
            <li>
              Deployed a back office hotel sales contract management system;
              reducing officers workload at managing contract
            </li>

            <li>
              Published a hotel and flight sales front-end interface with
              ReactJS; cutting development time
            </li>
            <li>
              Manage a team of 4 at corporate hotel book application
              microservice development project
            </li>
            <ul>
              <li>Improving existing workflow</li>
              <li>Migrating data from old system</li>
            </ul>
          </ul>
        </WorkExperienceLine>

        <WorkExperienceLine
          company="PT. Bach Multi Global"
          periodFrom={new Date(2014, 1, 1)}
          periodTo={new Date(2015, 8, 1)}
          skillSet="Tech Lead; C#, Asp.Net MVC, SQL Server"
        >
          {"Leading a team of 2 developers to develop an inhouse ERP system"}
        </WorkExperienceLine>
        <WorkExperienceLine
          company="PT. Kuala Kamoro"
          periodFrom={new Date(2012, 5, 1)}
          periodTo={new Date(2014, 1, 1)}
          skillSet="Jr. Software Developer; C#, Asp.Net Webform, SQL Server"
        >
          {"Managed an inhouse system used by PT. Freeport Indonesia that interacts with SAP."}
        </WorkExperienceLine>
      </div>
    </>
  );
};
