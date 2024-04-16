import { Router } from 'express'
import { getAllCommentPlaces, getCategoryPlaces, getCommentPlaces, getNamePlaces, getPopularPlaces } from '../controllers/placeAll'

const router = Router()
// all 
router.route('/api/popularPlaces')
.get(getPopularPlaces)
router.route('/api/commentAllPlaces')
.get(getAllCommentPlaces)
router.get('/api/categoryPlaces', getCategoryPlaces);

//api with id
router.route('/api/categoryPlaces/:placeCatId')
.get(getCategoryPlaces)
router.route('/api/commentPlaces/:commentPlaceId')
.get(getCommentPlaces)

//api with name
router.route('/api/namePlaces')
.get(getNamePlaces)



export default router