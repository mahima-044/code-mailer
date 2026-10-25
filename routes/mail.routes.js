import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { generateColdEmails } from "../services/mail.service.js"
import { deleteEmail, getEmailById, getMyEmails, sendMail, updateEmail } from "../controller/mail.controller.js"

const router = express.Router()

router.post('/generate',authMiddleware, generateColdEmails)
router.get('/',authMiddleware, getMyEmails)
router.get('/:id',authMiddleware, getEmailById)
router.get('/:id',authMiddleware, updateEmail)
router.get('/:id',authMiddleware, deleteEmail)
router.post('/:id',authMiddleware, sendMail)

export default router;

