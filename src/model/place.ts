import { RowDataPacket } from "mysql2"

export default interface Place extends RowDataPacket{
    id_place: number,
    name_place: string,
    description: string,
    image: string,
    address: string,
    lat: string,
    lng: string,
    category_id: number
}