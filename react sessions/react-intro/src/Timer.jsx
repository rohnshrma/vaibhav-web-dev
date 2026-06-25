// import React, { useState } from "react";

// const Timer = () => {
//   const [time, setTime] = useState(new Date().toLocaleTimeString());

//   const clickHandler = () => {
//     setTime(new Date().toLocaleTimeString());
//   };

//   return (
//     <div>
//       <h2>{time}</h2>
//       <button onClick={clickHandler}>UPDATE</button>
//     </div>
//   );
// };

// export default Timer;

import { useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const clickHandler = () => {
    setTime(new Date().toLocaleTimeString());
  };

  setInterval(clickHandler, 1000);

  return (
    <div>
      <h2>{time}</h2>
    </div>
  );
};

export default Timer;
