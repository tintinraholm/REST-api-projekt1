const express = require('express')
const { PrismaClient } = require('@prisma/client')
const authorize = require('../middleware/authorize')

const jwt = require('jsonwebtoken')
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
        console.log(error)
        res.status(500).send({ msg: "Error" })
        console.log(error)
    }
})

router.get("/:id", authorize, async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const note = await prisma.note.findUnique({
            where: { id: id }
        })
        res.json(note)
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Error, cannot get id" })
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
        res.json({ msg: "New note created", id: newNote.id })
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
        res.status(200).send({ msg: "Note deleted", deleteNote })
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Error: DELETE failed" })
    }
})

router.put('/:id', authorize, async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const note = await prisma.note.update({
            where: { id: id },
            data: {
                note: req.body.text
            }
        })
        res.status(200).send(note)
    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Error, put failed" })
    }
})

module.exports = router