import { useState } from "react";

const Form = () => {
  const [text, setText] = useState("");

  const changeHandler = (e) => {
    const input = e.target.value;
    setText(input);
  };
  return (
    <div>
      <h1>{text}</h1>
      <form>
        <input
          onChange={changeHandler}
          placeholder="Enter name..."
          type="text"
        />
      </form>
    </div>
  );
};

export default Form;
