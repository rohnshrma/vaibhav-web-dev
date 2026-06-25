import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/vaibhav_blog_auth_db"
    );

    console.log("DB CONNECTED =>", conn.connection.host);
  } catch (err) {
    console.log("error while connecting to db => ", err);
    process.exit(1);
  }
};

export default connectDB;
