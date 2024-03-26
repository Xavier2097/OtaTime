import { Router } from 'express'
import { createComment, deleteComment, getComment, getComments, updateComment } from '../controllers/comment.controller'
import validateToken from './validateToken'

const router = Router()

router.route('/')
  .get(getComments)
  .post(validateToken,createComment)

  router.route("/:commentId")
  .get(getComment)
  .patch(updateComment)
  .delete(deleteComment)

export default router