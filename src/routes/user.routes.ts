import { Router } from 'express'
import { createUser, deleteUser, getUser, getUsers, loginUser, updateUser } from '../controllers/user.controller'

const router = Router()

router.route('/')
  .get(getUsers)
  .post(createUser)
  
router.route('/login')
.post(loginUser)

router.route('/:userId')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

  export default router