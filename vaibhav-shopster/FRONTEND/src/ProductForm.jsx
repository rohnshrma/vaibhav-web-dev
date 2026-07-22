import axios from "axios";
import { useReducer } from "react";
import useProducts from "../hooks/useProduct";

const initialState = {
  name: "",
  price: "",
  description: "",
  url: "",
};

const formReducer = (state, action) => {
  if (
    action.type == "name" ||
    action.type == "price" ||
    action.type == "description" ||
    action.type == "url"
  ) {
    return {
      ...state,
      [action.type]: action.payload,
    };
  }

  if (action.type == "RESET") {
    return initialState;
  }

  return initialState;
};

const ProductForm = ({ fetchProducts }) => {
  const [product, dispatch] = useReducer(formReducer, initialState);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
  };

  const addProduct = async (product) => {
    console.log(product);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/products",
        product
      );
      console.log(response.data);
    } catch (err) {
      console.log("Failed to add product", err);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    await addProduct(product);
    dispatch({ type: "RESET" });
    fetchProducts();
  };

  return (
    <div className="product-form">
      <div className="form-heading">
        <span className="form-icon">+</span>
        <div>
          <h2>Add a New Product</h2>
          <p>Fill in the basic product information before publishing.</p>
        </div>
      </div>

      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="pname">Product Name</label>
          <input
            type="text"
            id="pname"
            name="name"
            className="form-control"
            placeholder="Enter Product Name..."
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pprice">Product Price</label>
          <input
            type="number"
            id="pprice"
            name="price"
            className="form-control"
            placeholder="Enter Product Price..."
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pdescription">Product Description</label>
          <textarea
            type="text"
            id="pdescription"
            name="description"
            className="form-control"
            placeholder="Enter Product Description..."
            onChange={changeHandler}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="pimg">Product Image URL</label>
          <input
            type="text"
            id="pimg"
            name="url"
            className="form-control"
            placeholder="Product Image Url..."
            onChange={changeHandler}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
