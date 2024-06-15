import { Router } from 'express'
import { generateCategoryPDF, reportAllSitesPDF, reportCommentsByPlacePDF, reportPopularSitePDF, reportUnPopularSitePDF, reportUserPDF } from '../controllers/report.controller';

const router = Router()

router.get('/report-categories', generateCategoryPDF);
router.get('/reportUser', reportUserPDF);
router.get('/reportAllPLaces', reportAllSitesPDF);
router.get('/reportPLacesPopular', reportPopularSitePDF);
router.get('/reportPLacesUnPopular', reportUnPopularSitePDF);
router.get('/reportCommentsPlace/:place_id', reportCommentsByPlacePDF);

export default router