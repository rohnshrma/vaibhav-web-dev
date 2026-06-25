import { useState } from "react";
import Counter from "./Counter";
import Timer from "./Timer";
import Form from "./Form";

const App = () => {
  const [theme, setTheme] = useState("light");

  const properties = {
    color: theme === "light" ? "#333" : "#fff",
    backgroundColor: theme === "light" ? "#fff" : "#333",
  };

  console.log("App Re-rendered");
  return (
    <div style={properties}>
      {/* <Counter /> */}

      <Form />
      <hr />
      {/* <Timer /> */}

      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
};

export default App;
