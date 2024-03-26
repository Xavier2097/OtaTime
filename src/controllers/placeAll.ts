import { Request, Response } from 'express'
import { connect  } from '../db'

export async function getCategoryPlaces(req: Request, res: Response): Promise<Response> {
    const id = req.params.placeCatId 
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

export async function getPopularPlaces(_req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    try {
        const popularPlaces = await conn.query(`
        SELECT p.id_place, p.name_place, p.description, p.image, p.address, p.lat, p.lng, p.category_id, AVG(c.rate) AS average_rating 
        FROM place p 
        INNER JOIN comment c ON p.id_place = c.place_id 
        GROUP BY p.id_place 
        ORDER BY average_rating DESC;
        `);
        return res.json(popularPlaces [0]);
    } catch (error) {
        return res.status(400).json({ message: 'Sitio no encontrado' });
    }
}

export async function getCommentPlaces(req: Request, res: Response): Promise<Response> {
    const id = req.params.commentPlaceId 
    const conn = await connect();
    try {
        const commentPlaces = await conn.query(`
        SELECT c.content, u.name AS user_name, u.last_name AS user_last_name, c.rate, c.date,
        p.name_place
        FROM 
        comment c
        JOIN 
        user u ON c.user_id = u.id_user
        JOIN 
        place p ON c.place_id = p.id_place
        WHERE 
        p.id_place = ?
        `, [id]);
        return res.json(commentPlaces[0]);
    } catch (error) {
        return res.status(400).json({ message: 'Sitio no encontrado' });
    }
}

export async function getAllCommentPlaces(_req: Request, res: Response): Promise<Response> {
    const conn = await connect();
    try {
        const commentAllPlaces = await conn.query(`
        SELECT DISTINCT p.id_place, p.name_place, p.description, p.image, p.address, p.lat, p.lng
        FROM 
        place p
        INNER JOIN 
        comment c ON p.id_place = c.place_id;
        `);
        return res.json(commentAllPlaces [0]);
    } catch (error) {
        return res.status(400).json({ message: 'Sitio no encontrado' });
    }
}

