import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const AddArea = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const nameChangeHandler = (e) => {
    setFormData((prevData) => {
      return {
        name: e.target.value,
        description: prevData.description,
      };
    });
  };
  const descriptionChangeHandler = (e) => {
    setFormData((prevData) => {
      return {
        name: prevData.name,
        description: e.target.value,
      };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    onAdd({
      ...formData,
      id: uuidv4(),
    });

    setFormData({
      name: "",
      description: "",
    });
  };

  return (
    <div className="container mt-5 border rounded shadow p-4">
      <h1>Add New Task</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Enter task name..."
            className="form-control"
            onChange={nameChangeHandler}
            value={formData.name}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="description"
            placeholder="Enter task description..."
            className="form-control"
            onChange={descriptionChangeHandler}
            value={formData.description}
          />
        </div>
        <button className="btn btn-outline-success">ADD TASK</button>
      </form>
    </div>
  );
};

export default AddArea;
