const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()

const PORT = process.env.PORT || 8070

app.use(express.json())
app.use(cors())

const notesRouter = require('./src/routes/notes')
app.use('/notes', notesRouter)

const drawingsRouter = require('./src/routes/drawings')
app.use('/drawings', drawingsRouter)

const boardsRouter = require('./src/routes/boards')
app.use('/boards', boardsRouter)

app.listen(PORT, () => {
    console.log(`Running on:${PORT}`)
})