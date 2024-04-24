import { Router } from 'express'
import { createPlace, deletePlace, getPlace, getPlaces, updatePlace, uploadImage } from '../controllers/place.controller'
import { uploadImageAndCreatePlace } from '../controllers/multer.controller'



const router = Router()

router.route('/')
    .get(getPlaces)
    .post(uploadImage, createPlace)

router.route('/:placeId')
    .get(getPlace)
    .patch(updatePlace)
    .delete(deletePlace)

router.route('/uploadImg')
    .post(uploadImage)

router.route('/uploadImage')
    .post(uploadImageAndCreatePlace)



export default router