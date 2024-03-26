import express from 'express';
import categoriesRoutes from '../routes/category.routes';
import countriesRoutes from '../routes/country.routes';
import userRoutes from '../routes/user.routes';
import placeRoutes from '../routes/place.routes';
import commentRoutes from '../routes/comment.routes';


const router = express.Router();

router.use('/category', categoriesRoutes);
router.use('/country', countriesRoutes);
router.use('/user', userRoutes);
router.use('/place', placeRoutes);
router.use('/comment', commentRoutes);

export default router;