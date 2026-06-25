import Header from "./Components/Header";
import expenses from "./data";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Expenses from "./Components/Expenses";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Expenses expenses={expenses} />
    </div>
  );
};

export default App;
