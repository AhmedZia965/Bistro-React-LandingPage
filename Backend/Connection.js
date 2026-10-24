
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import customerRoutes from "./Routes/customerRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/signup", customerRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

mongoose.connect(
    "mongodb+srv://ahmedabdurrehman116_db_user:NUK3batman10)@cluster0.lhdpqdo.mongodb.net/"
).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

export default app;
