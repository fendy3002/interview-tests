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
    <div>
      <div>
        <span
          style={{ fontSize: "1.2em", fontWeight: "bold", marginRight: "8px" }}
        >
          {props.company}
        </span>
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
          company="PT. Anadana Kode Nontunai"
          periodFrom={new Date(2019, 9, 1)}
          skillSet="NodeJS, ReactJS, MySQL, Git, Docker"
        >
          <div>
            {
              "Responsible to maintain e-wallet connection with banks and in-house applications."
            }
          </div>
          <div>{"Some notable works:"}</div>
          <ul>
            <li>
              develop and maintain e-wallet bank connection and automated
              transaction simulator
            </li>
            <li>develop e-wallet back-office administration tools</li>
            <li>
              develop and maintain other in-house projects, such as POS API and
              project management
            </li>
          </ul>
        </WorkExperienceLine>
      </div>
    </>
  );
};
