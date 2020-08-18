import dotenv from "dotenv";
import app from "./app";
import connectDB from "./database";

async function main() {
  try {
    dotenv.config();
    app.listen(app.get("port"));
    await connectDB();
    console.log("Server on port ", app.get("port"), "\nDatabase is connected");
  } catch (error) {
    console.log(error);
  }
}

main();
