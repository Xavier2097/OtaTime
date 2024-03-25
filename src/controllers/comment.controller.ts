import { Request, Response } from 'express'
import { connect  } from '../db'
import Comment from '../model/comment'
import { OkPacketParams } from 'mysql2'

export async function getComments (_req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    try {
      const users = await conn.query('SELECT * FROM comment')
    return res.json(users[0])
    } catch (error) {
      return res.status(500).json({ message: 'Error de Conexión'})
    }
  }

  export async function getComment (req: Request, res: Response): Promise<Response> {
    const id = req.params.commentId
    const conn = await connect()
    try {
        const [rows] = await conn.query('SELECT * FROM comment WHERE id_comment = ?', [id])
        if(rows instanceof Array && rows.length === 0) {
          return res.status(404).json({
            message: "comment not found",
          })
        }
        const comment = (rows instanceof Array && rows[0])
        return  res.json(comment)
    } catch (error) {
        return res.status(500).json({ message: 'connection error'})
    }
}

export async function createComment (req: Request, res: Response){
    const  newComment: Comment = req.body
    const conn = await connect()
    try {
     await conn.query(
        'INSERT INTO comment (content, user_id, rate, date, place_id) VALUES (?,?,?,?,?)', 
        [newComment.content, newComment.user_id, newComment.rate, newComment.date, newComment.place_id]) 
    return res.json({menssage: 'Comment added', newComment})
    } catch (error) {
      return res.status(500).json({ 
        message: 'connection error',
    })
    }
  }

  export async function updateComment(req: Request, res: Response) {
    const id = req.params.commentId
    const upComment: Comment = req.body
    const conn = await connect()
  try {
    const [result] = await conn.query(
        'UPDATE comment SET content = IFNULL(?,content), user_id = IFNULL(?,user_id), rate = IFNULL(?,rate), date = IFNULL(?,date), place_id = IFNULL(?,place_id) WHERE id_comment =?', 
        [upComment.content, upComment.user_id, upComment.rate, upComment.date, upComment.place_id, id])
    
    if((result as OkPacketParams).affectedRows === 0){
      return res.status(404).json({
        message: 'Comment not found',
      })
    }
    const user = await conn.query('SELECT * FROM comment WHERE id_comment = ?', [id])
    return res.json(user[0])
  } catch (error) {
    return res.status(500).json({ 
      message: 'connection error'
  })}
  }

  export async function deleteComment(req: Request, res: Response) {
    const id = req.params.commentId
    const conn = await connect()
    try {
    const [result] = await conn.query('DELETE FROM comment WHERE id_comment =?', [id])
    if((result as OkPacketParams).affectedRows === 0) {
      return res.status(404).json({
        message: 'comment not found',
      })
    }
    return res.json({
        message: "Comment deleted"
    })
    } catch (error) {
        return res.status(500).json({ 
            message: 'Error de Conexión'
        })
    }
  }