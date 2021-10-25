import express from "express";
import mongoose from "mongoose";;
import foodRouter from "./routes/foodRoutes.js";

const app = express();

app.use(express.json());
//solo poner useNewUrlParser y useUnifiedTopology porque las otras están deprecadas
mongoose.connect(
  "mongodb+srv://root:root123*@cluster0.zf9fl.mongodb.net/chatbotF1?retryWrites=true&w=majority",
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  }
);
//si la base de datos no existe Mongo la crea
app.use(foodRouter);

app.listen(3000, () => {
  console.log("Server is running...");
});
