const Task = ({ expense, onRemove }) => {
  return (
    <div className="col-lg-3 col-md-6 mt-5">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">{expense.name}</h3>
        </div>
        <div className="card-body">
          <p className="card-text">{expense.description}</p>
          <button
            onClick={() => onRemove(expense.id)}
            className="btn btn-outline-danger btn-sm"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
