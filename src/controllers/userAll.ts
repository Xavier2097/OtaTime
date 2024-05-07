import { Request, Response } from 'express'
import { connect  } from '../db'
import User from '../model/user';

export async function getStateUser(req: Request, res: Response): Promise<Response> {
    const stateUser: User = req.body 
    const conn = await connect();
    try {
        const user = await conn.query(`
        SELECT 
        id_user,
        name,
        last_name,
        country_id,
        age,
        mail,
        password,
        usertype_id,
        state
        FROM 
        user
        WHERE 
        state = ?;
        `, [stateUser.state]);
        return res.json(user[0]);
    } catch (error) {
        return res.status(400).json({ message: 'Sitio no encontrado' });
    }
}

export async function StateUserGet(req: Request, res: Response): Promise<Response> {
    // const stateUser: User = req.body 
    const stateUser = req.params.state;
    const conn = await connect();
    try {
        const user = await conn.query(`
        SELECT 
        id_user,
        name,
        last_name,
        country_id,
        age,
        mail,
        password,
        usertype_id,
        state
        FROM 
        user
        WHERE 
        state = ?;
        `, [stateUser]);
        return res.json(user[0]);
    } catch (error) {
        return res.status(400).json({ message: 'Sitio no encontrado' });
    }
}