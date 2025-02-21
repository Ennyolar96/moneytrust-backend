import mongoose from "mongoose";

const connection = async () => {
  try {
    const { connection: connect } = await mongoose.connect(
      process.env.MONGODB_URI
    );
    console.log(`mongoose ${connect.host}`);
  } catch (error: any) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connection;
