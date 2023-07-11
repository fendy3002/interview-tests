import { StatusBar } from "./StatusBar";

export const PersonalStatus = () => {
  return (
    <div>
      <div className="row mb-1">
        <div className="col">Javascript (including typescript and nodejs)</div>
        <div className="col">
          <StatusBar point={9} />
        </div>
      </div>
      <div className="row mb-1">
        <div className="col">PHP</div>
        <div className="col">
          <StatusBar point={8} />
        </div>
      </div>
      <div className="row mb-1">
        <div className="col">C#</div>
        <div className="col">
          <StatusBar point={6} />
        </div>
      </div>
      <div className="row mb-1">
        <div className="col">Java</div>
        <div className="col">
          <StatusBar point={6} />
        </div>
      </div>
      <div className="row mb-1">
        <div className="col">NestJs</div>
        <div className="col">
          <StatusBar point={8} />
        </div>
      </div>
      <div className="row mb-1">
        <div className="col">ReactJs</div>
        <div className="col">
          <StatusBar point={8} />
        </div>
      </div>
      <div className="row mb-1">
        <div className="col">Postgresql</div>
        <div className="col">
          <StatusBar point={8} />
        </div>
      </div>
    </div>
  );
};
