import { Router } from 'express'
import { createPlace, deletePlace, getPlace, getPlaces, updatePlace, uploadImage } from '../controllers/place.controller'
import { updatePlaceMulter, uploadImageAndCreatePlace } from '../controllers/multer.controller'



const router = Router()

router.route('/')
    .get(getPlaces)
    .post(createPlace)

router.route('/:placeId')
    .get(getPlace)
    .patch(updatePlace)
    .delete(deletePlace)

router.route('/uploadImg')
    .post(uploadImage)

router.route('/uploadImage')
    .post(uploadImageAndCreatePlace)

router.route('/updatePlace/:placeId')
    .patch(updatePlaceMulter)

export default router