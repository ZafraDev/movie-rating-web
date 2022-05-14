import { Router } from 'express'
import { createUser } from '../controllers/user'
import { validateCreateUser } from '../controllers/validators/user/validateCreateUser'
import trimRequest from '../middlewares/trimRequest'

const router = Router()

router.post('/', trimRequest.body, validateCreateUser, createUser)

export default router
