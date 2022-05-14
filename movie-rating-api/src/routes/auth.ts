import { Router } from 'express'
import trimRequest from '../middlewares/trimRequest'
import { validateSignIn } from '../controllers/validators/auth/validateSignIn'
import { signIn } from '../controllers/auth'
const router = Router()

router.post('/signin', trimRequest.body, validateSignIn, signIn)

export default router
