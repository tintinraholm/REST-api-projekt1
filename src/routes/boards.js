const express = require('express');
const router = express.Router();
const authorize = require('../middleware/authorize')

const jwt = require('jsonwebtoken')
require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//Ha en endpoint boards/, returnerar de boards användaren har rätt till

router.get('/boards', authorize, async (req, res) => {

    try {
        const boards = await prisma.boards.findMany({
            where: { userId: parseInt(req.authUser.sub) }
        })
        console.log(boards);

        res.json(boards)
    } catch (error) {
        console.error("Fel vid Prisma-query:", error);
        res.status(500).json({ msg: "Error. Problem fetching boards", error: error.message })
    }
})

module.exports = router;