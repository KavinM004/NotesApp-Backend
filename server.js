require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
const noteRouter = require('./routes/noteRouter')
const path = require('path')


const app = express()
app.use(cors())
app.use(express.json())


// Routes
app.use('/user', userRouter)
app.use('/api/notes', noteRouter)


// Connect to MongoDB
const URL = process.env.MongoDB_URL;
mongoose.connect(URL).then(()=> console.log(`Connected to MongoDB`));


// Listen Server
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})