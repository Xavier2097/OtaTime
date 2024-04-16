import { Request, Response } from "express";
import { connect } from "../db";

export async function getCategoryPlaces(
  req: Request,
  res: Response
): Promise<Response> {
  const id = req.params.placeCatId;
  const conn = await connect();
  try {
    let places;

    if (id) {
      places = await conn.query(
        `
            SELECT place.*, category.name_category AS category_name, 
            (SELECT AVG(rate) FROM comment WHERE place_id = place.id_place) AS average_rating 
            FROM place INNER JOIN category ON 
            place.category_id = category.id_category WHERE category.id_category = ?
            `,
        [id]
      );
    } else {
      places = await conn.query(`
      SELECT place.*, category.name_category 
      AS category_name , (SELECT AVG(rate) 
      FROM comment WHERE place_id = place.id_place) 
      AS average_rating FROM place 
      INNER JOIN category ON place.category_id = category.id_category
            `);
    }
    return res.json(places[0]);
  } catch (error) {
    return res.status(400).json({ message: "Sitio no encontrado" });
  }
}

export async function getPopularPlaces(
  _req: Request,
  res: Response
): Promise<Response> {
  const conn = await connect();
  try {
    const [popularPlaces] = await conn.query(`
            SELECT p.id_place, p.name_place, p.description, p.image, p.address, p.lat, p.lng, p.category_id, AVG(c.rate) AS average_rating 
            FROM place p 
            INNER JOIN comment c ON p.id_place = c.place_id 
            GROUP BY p.id_place 
            ORDER BY average_rating DESC;
        `);
    return res.json(popularPlaces);
  } catch (error) {
    return res.status(400).json({ message: "Sitio no encontrado" });
  }
}

export async function getCommentPlaces(
  req: Request,
  res: Response
): Promise<Response> {
  const id = req.params.commentPlaceId;
  const conn = await connect();
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = (page - 1) * limit;

    const query = `
    SELECT 
    c.id_comment,
    c.content,
    c.user_id,
    c.rate,
    c.date,
    c.place_id,
    u.name AS user_name,
    u.last_name AS user_last_name,
    p.name_place,
    p.id_place
FROM 
    comment c
JOIN 
    user u ON c.user_id = u.id_user
JOIN 
    place p ON c.place_id = p.id_place
WHERE 
    p.id_place = ?
            ORDER BY c.date DESC
            LIMIT ? OFFSET ?;`;
    const commentPlaces = await conn.query(query, [id, limit, offset]);
    return res.json(commentPlaces[0]);
  } catch (error) {
    return res.status(400).json({ message: "Sitio no encontrado" });
  }
}

export async function getAllCommentPlaces(
  req: Request,
  res: Response
): Promise<Response> {
  const conn = await connect();
  try {
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const offset = (page - 1) * limit;

    const query = `
        SELECT DISTINCT p.id_place, p.name_place, p.description, p.image, p.address, p.lat, p.lng
        FROM place p
        INNER JOIN comment c ON p.id_place = c.place_id
        LIMIT ? OFFSET ?;`;
    const commentAllPlaces = await conn.query(query, [limit, offset]);
    return res.json(commentAllPlaces[0]);
  } catch (error) {
    return res.status(400).json({ message: "Sitio no encontrado" });
  }
}
export async function getNamePlaces(
  req: Request,
  res: Response
): Promise<Response> {
  const conn = await connect();
  try {
    const { name } = req.query;
    const query = `
        SELECT place.*, (SELECT AVG(rate) FROM comment 
        WHERE place_id = place.id_place) 
        AS average_rating FROM place 
        WHERE place.name_place LIKE ?
        `;

    const namePattern = `%${name}%`;

    const places = await conn.query(query, [namePattern]);
    return res.json(places[0]);
  } catch (error) {
    return res.status(400).json({ message: "Sitio no encontrado" });
  }
}
