const express = require('express')
const { PrismaClient } = require('@prisma/client')
require('dotenv').config()
const cors = require('cors')


const app = express()
const prisma = new PrismaClient()

app.use(express.json())

app.use(cors())

const PORT = process.env.PORT || 8080

app.get('/', (req, res) => {
    res.send("It works!")
})

const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)

app.listen(PORT, () => {
    try {
        console.log(`Running on http://localhost:${PORT}`)
    } catch (error) {
        console.log(error)
    }
})