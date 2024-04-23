import { Router } from 'express'
import { createUser, deleteUser, forgotPassword, getUser, getUsers, loginUser, updatePassword, updateUser } from '../controllers/user.controller'
import { changePassword } from '../mailer/change-password'

const router = Router()

router.route('/')
  .get(getUsers)
  .post(createUser)
  
router.route('/login')
.post(loginUser)

router.route('/forgot-password/:mail')
.get(forgotPassword)

router.route('/update-password/:mail')
.post(updatePassword)

router.route('/change-password/:mail')
.get(changePassword)


router.route('/:userId')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser)

  export default router