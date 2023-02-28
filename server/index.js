require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");

mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://daithanh:dragonjack01@learn-testing.pezkihg.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
      }
    );

    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`sever run build on ${PORT}`));
