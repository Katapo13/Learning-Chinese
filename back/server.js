const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./ControlUsers/authRouter')
const port = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use("/api/auth", authRouter)//url по которому будет слушаться

const start = async () => {
  try {
    //подключение к бд
    await mongoose.connect('mongodb://127.0.0.1:27017/WebSait', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    app.listen(port, () => console.log(`Server started on port ${port}`));
  } catch (e) {
    console.log('Connection error:', e);
  }
}

start();
