import React from "react";
import { useReducer } from "react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

let initialized = false;
export const PersonalAbilities = () => {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  if (!initialized) {
    setTimeout(() => {
      forceUpdate();
      initialized = true;
    }, 1000);
  }

  const data = [
    {
      subject: "Programming",
      value: 9,
      fullMark: 10,
    },
    {
      subject: "Sys. Design",
      value: 8,
      fullMark: 10,
    },
    {
      subject: "Support",
      value: 8,
      fullMark: 10,
    },
    {
      subject: "Infra",
      value: 7,
      fullMark: 10,
    },
    {
      subject: "Leadership",
      value: 6,
      fullMark: 10,
    },
    {
      subject: "UI / UX",
      value: 5,
      fullMark: 10,
    },
  ];
  return (
    <div className="section personal-abilities">
      <h3>Abilities</h3>

      <div style={{ minWidth: "100%", maxHeight: "280px" }}>
        <ResponsiveContainer width="100%" aspect={1}>
          <RadarChart
            cx="50%"
            cy="35%"
            outerRadius="50%"
            data={data}
            style={{ fontSize: "14px", fontFamily: "'Droid Sans Mono', 'monospace', monospace" }}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" orientation="outer" />
            <PolarRadiusAxis domain={[0, 10]} />
            <Radar
              name="Fendy"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.8}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
