import express from 'express'
import fechPlaces from './routes/fechPlaces.routes'
import stateUser from './routes/allUser'
import routes from './services/server'
import cors from 'cors';
// import path from 'path';


const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json()) // middleware que transforma req.body a un json
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/assets', express.static('assets'));


app.use(fechPlaces)
app.use(stateUser)
app.use('/api', routes)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
