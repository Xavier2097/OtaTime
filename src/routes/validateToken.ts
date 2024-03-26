import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization']

    if (headerToken != undefined && headerToken.startsWith('Bearer')) {
        const beaderToken = headerToken.slice(7)
        try {
        const tokenValue = jwt.verify(beaderToken, process.env.SECRECT_KEY || 'root123')
        console.log(tokenValue)
        next()
        } catch (error) {
            res.status(400).json({
                message: 'token Invalid'
            })
        }
        
    }else{
        res.status(401).json({ message: 'No autorizado'})
    }
    
}

export default validateToken