const express = require('express')
const { PrismaClient } = require('@prisma/client')
const authorize = require('../middleware/authorize')

const router = express.Router()
const prisma = new PrismaClient()

router.get('/:currentBoardId', authorize, async (req, res) => {
    try {

        const currentBoardId = parseInt(req.params.currentBoardId)

        const notes = await prisma.note.findMany({
            where: { board_id: currentBoardId }
        })
        res.json(notes)
    } catch (error) {
        res.status(500).send({ msg: "Error" })
        console.log(error)
    }
})

router.post('/:currentBoardId', authorize, async (req, res) => {

    const currentBoardId = parseInt(req.params.currentBoardId)

    try {
        const newNote = await prisma.note.create({
            data: {
                author_id: parseInt(req.authUser.sub),
                note: req.body.text,
                board_id: currentBoardId
            }
        })
        res.json({ msg: "New note created", id: newNote.id, note: newNote.note, board_id: newNote.board_id })
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Error: POST failed" })
    }
})

router.delete('/:id', authorize, async (req, res) => {

    try {
        const deleteNote = await prisma.note.delete({
            where: {
                id: parseInt(req.params.id),
            }
        })
        res.json({ msg: "Note deleted", deleteNote })
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Error: DELETE failed" })
    }
})

router.put('/:id', authorize, async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const updatedNote = await prisma.note.update({
            where: { id: id },
            data: {
                note: req.body.text
            }
        })
        res.json(updatedNote)
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Error: PUT failed" })
    }
})

module.exports = router