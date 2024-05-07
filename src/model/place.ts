import { RowDataPacket } from "mysql2"

export default interface Place extends RowDataPacket{
    id_place: number,
    name_place: string,
    description: string,
    description_en: string,
    image: string,
    address: string,
    lat: number,
    lng: number,
    category_id: number
}