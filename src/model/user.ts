import { RowDataPacket } from "mysql2"

export default interface User extends RowDataPacket{
    id_user: number,
    name: string,
    last_name: string,
    country_id: number,
    age: number,
    mail: string,
    password: string,
    usertype_id: number,
    state: boolean
}