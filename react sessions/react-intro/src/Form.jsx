import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

  const emailChangeHandler = (e) => {
    console.log(e.target.value);

    setFormData((prevData) => {
      console.log("prevData =>", prevData);
      return {
        email: e.target.value,
        name: prevData.name,
      };
    });
  };
  const nameChangeHandler = (e) => {
    console.log(e.target.value);
    setFormData((prevData) => {
      console.log("prevData =>", prevData);
      return {
        name: e.target.value,
        email: prevData.email,
      };
    });
  };

  return (
    <div>
      <h1>{formData.name}</h1>
      <p>{formData.email}</p>
      <form>
        <input
          onChange={emailChangeHandler}
          type="email"
          placeholder="enter your email : "
        />
        <input
          onChange={nameChangeHandler}
          type="text"
          placeholder="enter your name : "
        />
      </form>
    </div>
  );
};

export default Form;
