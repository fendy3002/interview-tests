import moment from "dayjs";

export const EducationDate = (props: { date: Date }) => {
  return (
    <span style={{ fontStyle: "italic", fontSize: "0.9em" }}>
      {moment(props.date).format("YYYY MMM")}
    </span>
  );
};

export const EducationLine = (
  props: React.PropsWithChildren<{
    institute: string;
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
          {props.institute}
        </div>
        <div>
          <EducationDate date={props.periodFrom} />
          {" - "}
          {props.periodTo ? (
            <EducationDate date={props.periodTo} />
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
export const Education = () => {
  return (
    <>
      <div className="section work-experience">
        <h2 style={{ marginTop: "12px" }}>Education</h2>
        <EducationLine
          institute="Bina Nusantara University"
          periodFrom={new Date(2008, 6, 1)}
          periodTo={new Date(2012, 1, 1)}
          skillSet="Majoring in Information System"
        ></EducationLine>
        <EducationLine
          institute="Ricci High School"
          periodFrom={new Date(2005, 6, 1)}
          periodTo={new Date(2008, 5, 1)}
          skillSet=""
        ></EducationLine>
      </div>
    </>
  );
};
