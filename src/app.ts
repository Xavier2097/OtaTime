import express from 'express'
import fechPlaces from './routes/fechPlaces.routes'
import stateUser from './routes/allUser'
import routes from './services/server'
import cors from 'cors';


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/assets', express.static('assets'));


app.use(fechPlaces)
app.use(stateUser)
app.use('/api', routes)

export default app