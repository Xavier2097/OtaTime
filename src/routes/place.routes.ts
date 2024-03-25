import { Router } from 'express'
import { createPlace, deletePlace, getPlace, getPlaces, updatePlace } from '../controllers/place.controller'

const router = Router()

router.route('/')
    .get(getPlaces)
    .post(createPlace)

router.route('/:placeId')
    .get(getPlace)
    .patch(updatePlace)
    .delete(deletePlace)

export default router