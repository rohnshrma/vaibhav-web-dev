import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddArea from "./AddArea";
import Task from "./Task";

const App = () => {
  const [expenses, setExpenses] = useState([]);

  const addExpenseHandler = (newExpense) => {
    setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
  };
  const removeExpenseHandler = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  return (
    <div>
      <AddArea onAdd={addExpenseHandler} />

      <div className="content-area container mt-5 border rounded shadow p-4">
        <div className="row">
          {expenses.length === 0 ? (
            <h2>No Tasks Found</h2>
          ) : (
            expenses.map((expense) => {
              return (
                <Task
                  onRemove={removeExpenseHandler}
                  expense={expense}
                  key={expense.id}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
