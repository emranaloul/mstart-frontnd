import { UserType } from "../types";
import ServiceAPI from "./ServiceAPI";


class Users extends ServiceAPI {
    private path: string 
    constructor() {
        super()
        this.path = 'user'
    }

    public async getUsers(data:{limit:number, offset: number}& {}){
        try {
            return await this.get(this.path,data)
        } catch (error) {
            return error
        }
    }
    public async updateUser(data: UserType){
        try {
            return await this.put(this.path, data)
        } catch (error) {
            return error
        }
    }
    async deleteUsers(id:string){
        try {
            return await this.delete(`${this.path}/${id}`)
        } catch (error) {
            return error
        }
    }

    async getUser(id: string){
        try {
            return await this.get(`${this.path}/${id}`)
        } catch (error) {
            return error
        }
    }
}

export default new Users()