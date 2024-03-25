import { Request, Response } from 'express'
import { connect  } from '../db'

export async function getCategoryPlaces(req: Request, res: Response): Promise<Response> {
    const id = req.params.placeCatId // El ID de la categoría deseada
    const conn = await connect();
    try {
        const places = await conn.query(`
            SELECT DISTINCT place.*, category.name_category AS category_name
            FROM place
            INNER JOIN category ON place.category_id = category.id_category
            WHERE category.id_category = ?
        `, [id]);
        return res.json(places[0]);
    } catch (error) {
        return res.status(400).json({ message: 'Sitio no encontrado' });
    }
}