import { Request, Response } from 'express'
import { connect  } from '../db'

import { OkPacketParams } from 'mysql2'
import Country from '../model/country'


export async function getCountries (_req: Request, res: Response): Promise<Response> {
  const conn = await connect()
  try {
    const countries = await conn.query('SELECT * FROM country')
  return res.json(countries[0])
  } catch (error) {
    return res.status(400).json({ message: 'country not found' })
  }
}

export  async function  getCountry (req: Request, res: Response): Promise<Response>  {
  const id = req.params.paisId
  const conn = await connect()
  try {
  const [rows,_fields] = await conn.query('SELECT * FROM country WHERE id_country = ?', [id])
  if(rows instanceof Array && rows.length === 0) {
    return res.status(404).json({
      message: "country not found",
    })
  }
    const country = (rows instanceof Array && rows[0])
    return  res.json(country)
  } catch (error) {
    return res.status(500).json({ message: 'connection error'})
  }
}

export async function createCountry (req: Request, res: Response){
  const  newCountry: Country = req.body
  const conn = await connect()
  try {
   await conn.query('INSERT INTO country (name_country) VALUES (?)', [newCountry.name_country]) 
  return res.json({menssage: 'country added', newCountry})
  } catch (error) {
    return res.status(500).json({ 
      message: 'connection error'
  })
  }
}

export async function updateCountry(req: Request, res: Response) {
  const id = req.params.paisId
  const updateCountry: Country = req.body
  const conn = await connect()
try {
  const [result] = await conn.query('UPDATE country SET name_country = IFNULL(?,name_country) WHERE id_country =?', [updateCountry.name_country, id])
  
  if((result as OkPacketParams).affectedRows === 0){
    return res.status(404).json({
      message: 'country not found',
    })
  }
  const country = await conn.query('SELECT * FROM country WHERE id_country = ?', [id])
  return res.json(country[0])
} catch (error) {
  return res.status(500).json({ 
    message: 'connection error'
})}
}

export async function deleteCountry(req: Request, res: Response) {
  const id = req.params.paisId
  const conn = await connect()
  try {
    const [result] = await conn.query('DELETE FROM country WHERE id_country =?', [id])
    if((result as OkPacketParams).affectedRows === 0) {
      return res.status(404).json({
        message: 'country not found',
      })
    }
    return res.json({
      message: "country deleted"
  })
  } catch (error) {
    return res.status(500).json({ 
      message: 'connection error'
  })
  }
  

}