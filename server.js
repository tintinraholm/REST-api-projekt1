const express = require('express')
const { PrismaClient } = require('@prisma/client')

require('dotenv').config()
const app = express()
const prisma = new PrismaClient()

const PORT = process.env.PORT || 8070
app.use(express.json())

const notesRouter = require('./routes/notes')
app.use('/notes', notesRouter)

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