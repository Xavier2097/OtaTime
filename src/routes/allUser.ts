import { Router } from 'express'
import { StateUserGet, getStateUser } from '../controllers/userAll'

const router = Router()

router.route('/api/stateUser')
.post(getStateUser)

router.route('/api/stateUserGet/:state')
.get(StateUserGet)

export default router