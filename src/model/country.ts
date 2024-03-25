import { RowDataPacket } from "mysql2"

export default interface Country extends RowDataPacket{
    id_country: number,
    name_country: string,
}