import { Router } from 'express'
import { createCountry, getCountries, getCountry, updateCountry, deleteCountry } from '../controllers/country.controller'

const router = Router()
router.route('/')
  .get(getCountries)
  .post(createCountry) 
  router.route("/:paisId")
  .get(getCountry)
  .patch(updateCountry)
  .delete(deleteCountry)
  

export default router