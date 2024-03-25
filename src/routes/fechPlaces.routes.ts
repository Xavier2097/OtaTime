import { Router } from 'express'
import { getCategoryPlaces } from '../controllers/categoryPlace'

const router = Router()

router.route('/api/categoryPlaces/:placeCatId')
.get(getCategoryPlaces)

export default router