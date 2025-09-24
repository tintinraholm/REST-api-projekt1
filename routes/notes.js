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

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const note = await prisma.note.findUnique({
            where : { id:id }
        })
        res.json(note)
    } catch (error) {
        console.log(error)
        res.status(500).send({msg: "Error, cannot get id"})
    }
})

router.post('/', async (req, res) => {

    try {
        const newNote = await prisma.note.create({
            data: {
                author_id: parseInt(req.body.author_id), 
                note: req.body.text
            }
        })  
        res.json({msg: "New note created", id: newNote.id})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg: "Error: POST failed"})
    }
})

router.delete('/:id', async (req, res) => {
      
    try {
        const deleteNote = await prisma.note.delete({
            where: {
                id: parseInt(req.params.id),
            }
        })  
        res.status(200).send({msg: "Note deleted", deleteNote})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg: "Error: DELETE failed"})
}
})

router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const note = await prisma.note.update({
            where : { id: id },
            data: {
                note: req.body.text
            }
        })
        res.status(200).send(note)
    } catch (error) {
        console.log(error)
        res.status(500).send({msg: "Error, put failed"})
    }
})

module.exports = router