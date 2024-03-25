import { RowDataPacket } from "mysql2"

export default interface Category extends RowDataPacket{
    id_category: number,
    name_category: string,
}