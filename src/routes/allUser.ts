import { Router } from 'express'
import { getStateUser } from '../controllers/userAll'

const router = Router()

router.route('/api/stateUser')
.post(getStateUser)

export default router