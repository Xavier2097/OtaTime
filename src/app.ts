import express from 'express'
import fechPlaces from './routes/fechPlaces.routes'
import stateUser from './routes/allUser'
import routes from './services/server'
import cors from 'cors';
import {createPool} from 'mysql2/promise'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use('/assets', express.static('assets'));

const pool =  createPool({
    host: 'roundhouse.proxy.rlwy.net',
    user: 'root',
    password: 'ENQfcnGRikQGZTgalpAfEpYsuDDwEIES',
    port: 59240
})

app.get('/ping', async(_req, res) => {
const result = await pool.query("SELECT NOW()")
res.json(result[0])
})

app.use(fechPlaces)
app.use(stateUser)
app.use('/api', routes)

export default app