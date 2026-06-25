import { useState } from "react";

const Timer = () => {
  console.log("Timer Re-rendered");
  const [time, setTime] = useState("GET TIME");

  setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
  return (
    <div className="timer">
      <h2>{time}</h2>
      {/* <button onClick={() => setTime(new Date().toLocaleTimeString())}>
        UPDATE TIME
      </button> */}
    </div>
  );
};

export default Timer;
