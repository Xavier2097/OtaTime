import express from 'express'
// import diaryRouter from './routes/diaries'
import categoriesRoutes from './routes/category.routes'
import countriesRoutes from './routes/country.routes'
import userRoutes from './routes/user.routes'
import placeRoutes from './routes/place.routes'
import commentRoutes from './routes/comment.routes'
import fechPlaces from './routes/fechPlaces.routes'

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json()) // middleware que transforma req.body a un json


app.use('/api/category', categoriesRoutes)
app.use('/api/country', countriesRoutes)
app.use('/api/user', userRoutes)
app.use('/api/place', placeRoutes)
app.use('/api/comment', commentRoutes)
app.use('', fechPlaces)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
