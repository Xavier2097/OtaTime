import { Request, Response } from 'express'
import { connect  } from '../db'
import User from '../model/user'
import { OkPacketParams } from 'mysql2'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
  export async function getUsers (_req: Request, res: Response): Promise<Response> {
    const conn = await connect()
    try {
      const users = await conn.query('SELECT * FROM user')
    return res.json(users[0])
    } catch (error) {
      return res.status(400).json({ message: 'connnect error'})
    }
  }

export async function getUser (req: Request, res: Response): Promise<Response> {
    const id = req.params.userId
    const conn = await connect()
    try {
        const [rows] = await conn.query('SELECT * FROM user WHERE id_user = ?', [id])
        if(rows instanceof Array && rows.length === 0) {
          return res.status(404).json({
            message: "User not found",
          })
        }
        const user = (rows instanceof Array && rows[0])
        return  res.json(user)
    } catch (error) {
        return res.status(500).json({ message: 'connection error'})
    }
}

export async function createUser (req: Request, res: Response){
    const  newUser: User = req.body
    const hashedPassword = await bcrypt.hash(newUser.password,10)
    const conn = await connect()
    try {
     await conn.query(
        'INSERT INTO user (name, last_name, country_id, age, mail, password, usertype_id, state) VALUES (?,?,?,?,?,?,?,?)', 
        [newUser.name,newUser.last_name,newUser.country_id,newUser.age,newUser.mail,hashedPassword ,newUser.usertype_id,newUser.state]) 
    return res.json({menssage: 'user added', newUser})
    } catch (error) {
      return res.status(500).json({ 
        message: 'connection error'
    })
    }
  }

  export async function updateUser(req: Request, res: Response) {
    const id = req.params.userId
    const updateUser: User = req.body
    const hashedPassword = await bcrypt.hash(updateUser.password,10)
    const conn = await connect()
  try {
    const [result] = await conn.query(
        'UPDATE user SET name = IFNULL(?,name), last_name = IFNULL(?,last_name), country_id = IFNULL(?,country_id), age = IFNULL(?,age), mail = IFNULL(?,mail), password = IFNULL(?,password), usertype_id = IFNULL(?,usertype_id), state = IFNULL(?,state) WHERE id_user =?', 
        [updateUser.name, updateUser.last_name, updateUser.country_id, updateUser.age, updateUser.mail, hashedPassword, updateUser.usertype_id, updateUser.state, id])
    
    if((result as OkPacketParams).affectedRows === 0){
      return res.status(404).json({
        message: 'user not found',
      })
    }
    const user = await conn.query('SELECT * FROM user WHERE id_user = ?', [id])
    return res.json(user[0])
  } catch (error) {
    return res.status(500).json({ 
      message: 'connection error'
  })}
  }
  
  export async function deleteUser(req: Request, res: Response) {
    const id = req.params.userId
    const conn = await connect()
    try {
    const [result] = await conn.query('DELETE FROM user WHERE id_user =?', [id])
    if((result as OkPacketParams).affectedRows === 0) {
      return res.status(404).json({
        message: 'user not found',
      })
    }
    return res.json({
        message: "user deleted"
    })
    } catch (error) {
        return res.status(500).json({ 
            message: 'connection error'
        })
    }
  }

  export async function loginUser (req: Request, res: Response): Promise<Response> {
    const  logUser: User = req.body
    const conn = await connect()
    try {
      const [rows] = await conn.query('SELECT * FROM user WHERE mail =?',[logUser.mail])
      if(rows instanceof Array && rows.length === 0) {
        return res.status(404).json({
          message: "User not found",
        })
      }
      
      const passUser = (rows instanceof Array && rows[0]) as { password: string, name:string, mail:string, id_user:number, usertype_id:number, state: boolean, last_name: string }
      const match = await bcrypt.compare(logUser.password,passUser.password)
      if(match){
        const token = jwt.sign({
          mail: passUser.mail, 
          name: passUser.name, 
          last_name: passUser.last_name, 
          user_id: passUser.id_user, 
          usertype_id: passUser.usertype_id,
          
        }, process.env.SECRECT_KEY || 'root123')

        return res.status(200).json({
          message: "login success",
          id: passUser.id_user,
          mail: passUser.mail,
          user: passUser.name +" "+ passUser.last_name,
          password: passUser.password,
          usertype_id : passUser.usertype_id,
          state: passUser.state,
          token: token
        })

      }else{
       return res.status(401).json({
         message: "login failed"
       })
      }
    // return res.json(rows) 
    } catch (error) {
      return res.status(400).json({ message: 'connnect error'})
    }
  }

  export async function forgotPassword (req: Request, res: Response): Promise<Response> {
    const email = req.params.mail
    const updateUser: User = req.body
    const hashedPassword = await bcrypt.hash(updateUser.password,10)
    const conn = await connect();
    try {
      const [rows] = await conn.query('SELECT * FROM user WHERE mail = ?', [email])
      if(rows instanceof Array && rows.length === 0) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
  

      await conn.query('UPDATE user SET password = ? WHERE mail = ?', [hashedPassword, email])
      return res.status(200).json({
        message: 'password changed',
      });
      
    } catch (error) {
      return res.status(400).json({ message: 'connnect error'})
    }
  }

