
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/add_product", (req, res) => {
    console.log("POST request received at /add_product");
    res.send("Add Product endpoint reached");
});

// Signup endpoint
app.post("/signup", (req, res) => {
    console.log("POST request received at /signup");
    console.log(req.body);

    res.send("Signup endpoint reached");
});

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
