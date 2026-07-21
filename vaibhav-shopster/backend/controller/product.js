import Product from "../model/product.js";

const ADD_PRODUCT = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    console.log(req.body);
    const imageUrl = req.body.imageUrl || req.body.url;

    if (!name || !description || price === undefined || !imageUrl) {
      return res.status(400).json({
        message: "All Fields Must Be Provided",
        data: null,
        status: "Failed",
      });
    }

    const existingProduct = await Product.findOne({ name });

    console.log("Exisiting product ", existingProduct);
    if (existingProduct) {
      return res.status(400).json({
        message: "Product Already Exists",
        data: null,
        status: "Failed",
      });
    }

    const product = new Product({
      name: name.trim(),
      description: description.trim(),
      imageUrl,
      price,
    });

    console.log("new product ", product);

    const savedProduct = await product.save();

    console.log(savedProduct, product);
    return res.status(201).json({
      message: "Product Added Successfully",
      data: savedProduct,
      status: "Success",
    });
  } catch (err) {
    return handleControllerError(res, err);
  }
};

const REMOVE_PRODUCT = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid Product Id",
        data: null,
        status: "Failed",
      });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
        data: null,
        status: "Failed",
      });
    }

    return res.json({
      message: "Product Removed Successfully",
      data: product,
      status: "Success",
    });
  } catch (err) {
    return handleControllerError(res, err);
  }
};

const GET_PRODUCTS = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.json({
      message: "Products Fetched Successfully",
      data: products,
      status: "Success",
    });
  } catch (err) {
    return handleControllerError(res, err);
  }
};

const GET_PRODUCT = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid Product Id",
        data: null,
        status: "Failed",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
        data: null,
        status: "Failed",
      });
    }

    return res.json({
      message: "Product Fetched Successfully",
      data: product,
      status: "Success",
    });
  } catch (err) {
    return handleControllerError(res, err);
  }
};

const UPDATE_PRODUCT = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid Product Id",
        data: null,
        status: "Failed",
      });
    }

    const updates = {};
    const allowedFields = ["name", "description", "price", "imageUrl"];

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] =
          typeof req.body[field] === "string"
            ? req.body[field].trim()
            : req.body[field];
      }
    }

    if (req.body.image !== undefined && updates.imageUrl === undefined) {
      updates.imageUrl = req.body.image;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: "No Product Fields Provided For Update",
        data: null,
        status: "Failed",
      });
    }

    if (updates.name) {
      const existingProduct = await Product.findOne({
        name: updates.name,
        _id: { $ne: id },
      });

      if (existingProduct) {
        return res.status(400).json({
          message: "Product Already Exists",
          data: null,
          status: "Failed",
        });
      }
    }

    const product = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
        data: null,
        status: "Failed",
      });
    }

    return res.json({
      message: "Product Updated Successfully",
      data: product,
      status: "Success",
    });
  } catch (err) {
    return handleControllerError(res, err);
  }
};

const isValidObjectId = (id) => Product.db.base.Types.ObjectId.isValid(id);

const handleControllerError = (res, err) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: err.message,
      data: null,
      status: "Failed",
    });
  }

  return res.status(500).json({
    message: "Internal Server Error",
    data: null,
    status: "Failed",
  });
};

export {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
};

export default {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  GET_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
};
