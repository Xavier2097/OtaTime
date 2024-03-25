import { RowDataPacket } from "mysql2"

export default interface Comment extends RowDataPacket{
    id_comment: number,
    content: string,
    user_id: number,
    rate: number,
    date: Date,
    place_id: number,
}