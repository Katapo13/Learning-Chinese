const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors') // нужно так как бэк и фронт на разных портах
const authRouter = require('./ControlUsers/authRouter')
const dictionaryRouter = require('./ControlDictionary/dictionaryRouter')
const textRouter = require('./ControlText/textRouter')
const testRouter = require('./ControlTest/testRouter')
const exerciseRouter = require('./ControlExercise/exerciseRouter')
const port = process.env.PORT || 5000

const app = express()
app.use(cors()); //подклбючаем корс

//позволяет express распознавать json в запросах
app.use(express.json())

app.use("/api/auth", authRouter)//url по которому будет слушаться для авторизации
app.use("/api", dictionaryRouter)//url по которому будет слушаться для словаря
app.use("/api", textRouter)//url по которому будет слушаться для текстов
app.use("/api", testRouter)//url по которому будет слушаться для тестов 
app.use("/api", exerciseRouter)//url по которому будет слушаться для тестов 


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
