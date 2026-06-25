import React from "react";

const ExpenseCard = (props) => {
  return (
    <div className="col-lg-4 col-md-6 mt-4">
      <div className="card border shadow rounded p-5">
        <h5>{props.name}</h5>
        <p>{props.amount}</p>
      </div>
    </div>
  );
};

export default ExpenseCard;
