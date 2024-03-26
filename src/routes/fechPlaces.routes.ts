import { Router } from 'express'
import { getAllCommentPlaces, getCategoryPlaces, getCommentPlaces, getPopularPlaces } from '../controllers/placeAll'

const router = Router()
// all 
router.route('/api/popularPlaces')
.get(getPopularPlaces)
router.route('/api/commentAllPlaces')
.get(getAllCommentPlaces)

//api with id
router.route('/api/categoryPlaces/:placeCatId')
.get(getCategoryPlaces)
router.route('/api/commentPlaces/:commentPlaceId')
.get(getCommentPlaces)

export default router