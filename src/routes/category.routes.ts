import { Router } from 'express'
import { createCategory, deleteCategory, getCategories,getCategory, updateCategory } from '../controllers/category.controller'

const router = Router()

router.route('/')
  .get(getCategories)
  .post(createCategory)

  router.route("/:categoryId")
  .get(getCategory)
  .patch(updateCategory)
  .delete(deleteCategory)
  

export default router
 