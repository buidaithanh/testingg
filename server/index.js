require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONDODB_URL, {
      useNewUrlParser: true,
    });

    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();
const app = express();

//vercel
const { v4 } = require("uuid");
app.get("/api", (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});

app.get("/api/item/:slug", (req, res) => {
  const { slug } = req.params;
  res.end(`Item: ${slug}`);
});
//vercel

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`sever run build on ${PORT}`));
