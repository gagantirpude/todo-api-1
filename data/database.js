//import
import mongoose from "mongoose";

//Database
const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      dbName: "todo-api",
    })
    .then((c) => console.log(`Database Connect ${c.connection.host}`))
    .catch((error) => console.log(error));
};

//export
export default connectDB;
