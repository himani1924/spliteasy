import express from 'express'
import passport from 'passport'
import { authMiddleware } from '../middleware/auth.js'
import { addGroupMembers, createGroup } from '../controllers/groupController.js'

const router = express.Router()

// localhost:5000/groups
router.post('/create', authMiddleware, createGroup)
router.post('/:groupId/add-members', authMiddleware, addGroupMembers)



export default router
