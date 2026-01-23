const express = require('express')
const { getAllUser, getAllMessage, sendMessage } = require('../controllers/messageController')
const { protectRoute } = require('../middleware/protectRoute')
const router = express.Router()


router.get('/users',protectRoute,getAllUser)
router.get('/:id',protectRoute,getAllMessage)
router.post('/send/:id',protectRoute,sendMessage)


module.exports =router
