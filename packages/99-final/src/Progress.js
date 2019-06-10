import React from "react";

// https://codepen.io/xgad/post/svg-radial-progress-meters
export default function Progress({
  width = 120,
  height = 120,
  strokeWidth = 12,
  fontSize = 20,
  percentage = 40,
  text = ""
}) {
  const radius = width / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = (circumference * (100 - percentage)) / 100;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <g transform={`rotate(-90 ${width / 2} ${height / 2})`}>
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          fill="none"
          stroke="#aaa"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          fill="none"
          stroke="#f77a52"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "all 600ms ease-in-out" }}
        />
      </g>
      {text ? (
        <text
          x={width / 2}
          y={height / 2}
          fontSize={fontSize}
          dominantBaseline="middle"
          textAnchor="middle"
          style={{
            fontFeatureSettings: "tnum",
            fontVariantNumeric: "tabular-nums"
          }}
        >
          {text}
        </text>
      ) : null}
      />
    </svg>
  );
}
