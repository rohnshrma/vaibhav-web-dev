import { useState } from "react";

const Counter = () => {
  console.log("Counter Re-rendered");
  const [count, setCount] = useState(0);

  const incrementHandler = () => {
    setCount(count + 1);
  };

  return (
    <div className="counter">
      <h1>{count}</h1>
      <button onClick={incrementHandler}>INCREMENT</button>
    </div>
  );
};

export default Counter;
