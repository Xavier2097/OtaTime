import { Request, Response } from 'express'
import { connect  } from '../db'
import _Place from '../model/place'
import { OkPacketParams } from 'mysql2'
import Place from '../model/place'

export async function getPlaces (_req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    try {
        const places = await conn.query('SELECT place.*, (SELECT AVG(rate) FROM comment WHERE place_id = place.id_place) AS average_rating FROM place')
    return res.json(places[0])
    } catch (error) {
        return res.status(400).json({ message: 'place not found' })
    }
}

export  async function  getPlace (req: Request, res: Response): Promise<Response>  {
    const id = req.params.placeId
    const conn = await connect()
    try {
        const places = await conn.query(`
        SELECT place.*, 
        (SELECT AVG(rate) FROM comment WHERE place_id = place.id_place) AS average_rating 
        FROM place 
          WHERE place.id_place = ?
          `, [id])
        return  res.json(places[0])
    } catch (error) {
        return res.status(500).json({ message: 'connection error'})
    }
}

export async function createPlace (req: Request, res: Response) {
    const  newPlace: Place = req.body
    const conn = await connect()
    try {
        await conn.query(
            'INSERT INTO place (name_place, description, image, address, lat, lng, category_id) VALUES (?,?,?,?,?,?,?)', 
            [newPlace.name_place, newPlace.description, newPlace.image, newPlace.address, newPlace.lat, newPlace.lng, newPlace.category_id]) 
        return res.json({menssage: 'place added', newPlace})
    } catch (error) {
        return res.status(500).json({ 
            message: 'connection error'
        })
    }
}

export async function updatePlace(req: Request, res: Response) {
    const id = req.params.placeId
    const newUpdatePlace: Place = req.body
    const conn = await connect()
  try {
    const [result] = await conn.query(
        'UPDATE place SET name_place = IFNULL(?,name_place), description = IFNULL(?,description), image = IFNULL(?,image), address = IFNULL(?,address), lat = IFNULL(?,lat), lng = IFNULL(?,lng), category_id = IFNULL(?,category_id) WHERE id_place =?', 
        [newUpdatePlace.name_place, newUpdatePlace.description, newUpdatePlace.image, newUpdatePlace.address, newUpdatePlace.lat, newUpdatePlace.lng, newUpdatePlace.category_id , id])
    
    if((result as OkPacketParams).affectedRows === 0){
      return res.status(404).json({
        message: 'place not found',
      })
    }
    const user = await conn.query('SELECT * FROM place WHERE id_place = ?', [id])
    return res.json(user[0])
  } catch (error) {
    return res.status(500).json({ 
      message: 'connect error'
  })}
  }

  export async function deletePlace(req: Request, res: Response) {
    const id = req.params.placeId
    const conn = await connect()
    try {
    const [result] = await conn.query('DELETE FROM place WHERE id_place =?', [id])
    if((result as OkPacketParams).affectedRows === 0) {
      return res.status(404).json({
        message: 'place not found',
      })
    }
    return res.json({
        message: "place deleted"
    })
    } catch (error) {
        return res.status(500).json({ 
            message: 'connection error'
        })
    }
  }