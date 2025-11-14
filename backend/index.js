import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'
dotenv.config();
import cors from 'cors';
import Todo from './models/todoModel.js'

const app = express();


app.use(cors({
    origin: "https://your-frontend-url.onrender.com",
    credentials: true,
  }));
app.use(express.json());


mongoose.connect(`${process.env.MONGODB_URL}`)
.then(() => console.log("Database Connected Successfully"))
.catch((err) => console.log(err));


app.post("/todos", async (req, res) => {
  try {
    const todo = await Todo.create({ title: req.body.title });
    res.json({ message: "Todo added", todo });
  } catch (error) {
    res.status(500).json({ error: "Failed to add todo" });
  }
});


app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json({ todos });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running...");
});
app.listen(process.env.PORT || 3000, () => console.log('Server is listening on port 5000'));
