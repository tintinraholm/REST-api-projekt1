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