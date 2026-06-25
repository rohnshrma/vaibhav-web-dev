import ExpenseCard from "./ExpenseCard";

const Expenses = ({ expenses }) => {
  return (
    <div id="expenses" className="row m-5">
      {expenses.map((expenseObj) => {
        return (
          <ExpenseCard name={expenseObj.name} amount={expenseObj.amount} />
        );
      })}
    </div>
  );
};

export default Expenses;
