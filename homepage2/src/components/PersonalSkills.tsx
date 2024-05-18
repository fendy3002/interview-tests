import { StatusBar } from "./StatusBar";

export const SkillLine = (props: { text: string; point: number }) => {
  return (
    <>
      <div className="row " style={{marginBottom: '4px', fontWeight: 'bold'}}>
        <div className="column text-right">{props.text}</div>
      </div>
      <div className="row mb-1">
        <div className="column">
          <StatusBar point={props.point} />
        </div>
      </div>
    </>
  );
};
export const PersonalSkills = () => {
  return (
    <div className="section personal-status">
      <SkillLine text="JS, TS, NodeJS" point={9} />
      <SkillLine text="PHP, Laravel" point={8} />
      <SkillLine text="C#, Java" point={6} />
      <SkillLine text="PostgreSQL" point={8} />
      <SkillLine text="NestJS, ReactJS" point={8} />
    </div>
  );
};
