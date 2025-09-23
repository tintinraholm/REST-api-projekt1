const express = require('express')
const { PrismaClient } = require('@prisma/client')

const router = express.Router()
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
    try {
        const notes = await prisma.note.findMany()
        res.json(notes)
    } catch (error) {
        console.log(error)
        res.status(500).send({msg: "Error"})
        console.log(error)
    }
})

module.exports = router