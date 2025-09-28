const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize')

const jwt = require('jsonwebtoken')
require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//Ha en endpoint boards/, returnerar de boards användaren har rätt till

router.get('/', authorize, async (req, res) => {

    try {
        const boards = await prisma.boards.findMany({
            where: { user_id: parseInt(req.authUser.sub) }
        })
        console.log(boards);

        if (!boards || boards.length === 0) {
            return res.status(404).json({ msg: "Inga boards hittades" });
        }

        res.json({boards})
    } catch (error) {
        console.error("Fel vid Prisma-query:", error);
        res.status(500).json({ msg: "Error. Problem fetching boards", error: error.message })
    }
})

//skapa en ny board för den användare som är inloggad
router.post('/', authorize, async (req, res) => {

    try {
        const newBoard = await prisma.boards.create({
            data:
            {
                name: req.body.name,
                user_id: parseInt(req.authUser.sub)
            }
        })
        console.log({ newBoard });

        res.json({ newBoard })
    } catch (error) {
        console.error("Fel vid Prisma-query:", error);
        res.status(500).json({ msg: "Kunde inte skapa board", error: error.message })
    }
})

module.exports = router;