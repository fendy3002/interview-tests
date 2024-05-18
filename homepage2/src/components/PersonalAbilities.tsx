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
      subject: "Leadership",
      value: 6,
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
      subject: "UI / UX",
      value: 5,
      fullMark: 10,
    },
  ];
  return (
    <div className="section personal-abilities">
      <div style={{ minWidth: "100%", maxHeight: "240px" }}>
        <ResponsiveContainer width="100%" aspect={1}>
          <RadarChart
            cx="45%"
            cy="43%"
            outerRadius="60%"
            data={data}
            style={{ fontSize: "12px" }}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="subject" orientation="outer" />
            <PolarRadiusAxis
              tickCount={3}
              domain={[0, 10]}
            />
            <Radar
              name="Fendy"
              dataKey="value"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.9}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
