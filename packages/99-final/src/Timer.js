import React, { useState, useEffect } from "react";
import Progress from "./Progress";
import Button from "./Button";
import { format, addMilliseconds } from "date-fns";
import { SizeMe } from "react-sizeme";

const TOTAL_TIME = 0.5 * 60 * 1000;
export default function Timer() {
  const [totalTime, setTotalTime] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [endTime, setEndTime] = useState(null);
  const handleToggle = () => {
    const now = new Date();
    if (!isRunning) {
      setEndTime(addMilliseconds(now, timeLeft));
      setIsRunning(true);
    } else {
      setTimeLeft(endTime - now);
      setIsRunning(false);
    }
  };
  const handleReset = () => {
    setTimeLeft(TOTAL_TIME);
    setIsRunning(false);
    setEndTime(null);
    setTotalTime(TOTAL_TIME);
  };

  useEffect(() => {
    let timer;
    if (timeLeft <= 0) {
      handleReset();
    } else if (isRunning) {
      timer = setTimeout(() => {
        setTimeLeft(endTime - new Date());
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [timeLeft, isRunning, endTime]);

  const text = format(addMilliseconds(new Date(0), timeLeft), "mm:ss");
  const percentage = ((totalTime - timeLeft) / totalTime) * 100;
  return (
    <SizeMe>
      {({ size }) => (
        <div style={{ display: "inline-block" }}>
          <Progress
            width={size.width}
            height={size.width}
            strokeWidth={size.width / 7}
            fontSize={size.width / 7}
            percentage={percentage}
            text={text}
          />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button primary onClick={handleToggle}>
              {isRunning ? "Pause" : "Start"}
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </div>
      )}
    </SizeMe>
  );
}
