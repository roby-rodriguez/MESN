import mongoose from "mongoose";

const uri = "mongodb://localhost/sevn";
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

export default async function connectDB() {
  await mongoose.connect(uri, options);
};
