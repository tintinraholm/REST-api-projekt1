const express = require('express')
const { PrismaClient } = require('@prisma/client')
const cors = require("cors")

require('dotenv').config()
const app = express()
const prisma = new PrismaClient()

const PORT = process.env.PORT || 8070
app.use(express.json())
app.use(cors())

const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)

const drawingsRouter = require('./routes/drawings')
app.use('/drawings', drawingsRouter)

app.get('/', (req, res) => {
    res.send("It works!")
})

app.listen(PORT, () => {
    try {
        console.log(`Running on http://localhost:${PORT}`)
    } catch (error) {
        console.log(error)
    }
})