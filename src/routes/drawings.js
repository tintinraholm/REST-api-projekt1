const express = require('express')
const { PrismaClient, Prisma } = require('@prisma/client')
const router = express.Router()
const prisma = new PrismaClient()
const authorize = require('../middleware/authorize')

router.get('/', async (req, res) => {
    try {
        const drawings = await prisma.note.findMany()
        res.json(drawings)
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Error: GET failed" })
        console.log(error)
    }
})

router.post('/', authorize, async (req, res) => {
    try {
        const newDrawing = await prisma.note.create({
            data: {
                author_id: parseInt(req.authUser.sub),
                note: null,
                drawing: req.body.drawing
            }
        })
        res.json({ msg: "New drawing saved", id: newDrawing.id })
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Error: POST failed" })
    }
})

router.delete('/:id', authorize, async (req, res) => {

    try {
        const deleteDrawing = await prisma.note.delete({
            where: {
                id: parseInt(req.params.id),
            }
        })
        res.json({ msg: "Drawing deleted", deleteDrawing })
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Error: DELETE failed" })
    }
})

router.put('/:id', authorize, async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const updatedDrawing = await prisma.note.update({
            where: { id: id },
            data: {
                drawing: req.body.drawing
            }
        })
        res.json(updatedDrawing)
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Error: PUT failed" })
    }
})

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const drawing = await prisma.note.findUnique({
            where: { id: id }
        })
        res.json(drawing)
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Error, cannot get id" })
    }
})

module.exports = router