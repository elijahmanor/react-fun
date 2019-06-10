import React from "react";

const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function Ball() {
  const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const size = `${getRandom(1, 10)}rem`;
  return (
    <div
      style={{
        position: "absolute",
        height: size,
        width: size,
        borderRadius: "50%",
        top: `${getRandom(0, 100)}%`,
        left: `${getRandom(0, 100)}%`,
        backgroundColor: color,
        zIndex: -1
      }}
    />
  );
}
const balls = [...Array(100)].map((_, i) => <Ball index={i} key={i} />);

export default function Background({ children }) {
  return (
    <>
      <div className="Background">{children}</div>
      {balls}
    </>
  );
}
