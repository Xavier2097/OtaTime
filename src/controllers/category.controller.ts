import { Request, Response } from 'express'
import { connect  } from '../db'
import Category from '../model/category'
import { OkPacketParams } from 'mysql2'


export async function getCategories (_req: Request, res: Response): Promise<Response> {
  const conn = await connect()
  try {
    const categories = await conn.query('SELECT * FROM category')
  return res.json(categories[0])
  } catch (error) {
    return res.status(400).json({ message: 'category not found'})
  }
}

export  async function  getCategory (req: Request, res: Response): Promise<Response>  {
  const id = req.params.categoryId
  const conn = await connect()
  try {
  const [rows,_fields] = await conn.query('SELECT * FROM category WHERE id_category = ?', [id]) 
  if(rows instanceof Array && rows.length === 0) {
    return res.status(404).json({
      message: "category not found",
    })
  }
  const category = (rows instanceof Array && rows[0])
  return res.json(category)
  } catch (error) {
    return res.status(500).json({ message: 'connection error'})
  }
  
}

export async function createCategory (req: Request, res: Response){
  const  newCategory: Category = req.body
  const conn = await connect()
  try {
   await conn.query('INSERT INTO category (name_category,image) VALUES (?,?)', [newCategory.name_category,newCategory.image]) 
  return res.json({menssage: 'added category', newCategory})
  } catch (error) {
    return res.status(500).json({ 
      message: 'connection error'
  })
  }
}

export async function updateCategory(req: Request, res: Response) {
  const id = req.params.categoryId
  const updateCategory: Category = req.body
  const conn = await connect()
try {
  const [result] = await conn.query('UPDATE category SET name_category = IFNULL(?,name_category), image = IFNULL(?,image) WHERE id_category =?', [updateCategory.name_category,updateCategory.image, id])
  
  if((result as OkPacketParams).affectedRows === 0){
    return res.status(404).json({
      message: 'category not found',
    })
  }
  const [category] = await conn.query('SELECT * FROM category WHERE id_category = ?', [id])
  const getCategory = (category instanceof Array && category[0])
  return res.json(getCategory)
} catch (error) {
  return res.status(500).json({ 
    message: 'connetion error'
})}
}

export async function deleteCategory(req: Request, res: Response) {
  const id = req.params.categoryId
  const conn = await connect()
  try {
    const [result] = await conn.query('DELETE FROM category WHERE id_category =?', [id])
    if((result as OkPacketParams).affectedRows === 0) {
      return res.status(404).json({
        message: 'category not found',
      })
    }
    return res.json({
      message: "category deleted"
  })
  } catch (error) {
    return res.status(500).json({ 
      message: 'connection error'
  })
  }
  

}