import express from 'express'
import fechPlaces from './routes/fechPlaces.routes'
import stateUser from './routes/allUser'
import routes from './services/server'
import cors from 'cors';
import {createPool} from 'mysql2/promise'
import { buldPDF } from './libs/pdfKits';

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

app.get('/generate-pdf', (_req, res) =>{
  const stream =  res.writeHead(200,
        {
            'Content-Type':'application/pdf',
            'Content-Disposition': 'attachment; filename=example.pdf'
        }
    )
    
    buldPDF(
        (data)=> stream.write(data),
        ()=>stream.end())
})

app.use(fechPlaces)
app.use(stateUser)
app.use('/api', routes)

export default app