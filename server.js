const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    try {
        console.log(`Running on http://localhost:${PORT}`)
    } catch (error) {
        console.log(error)
    }
})