import { StatusBar } from "./StatusBar";

export const PersonalAbilities = () => {
  return (
    <div className="section personal-abilities">
      <h3>Abilities</h3>
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
