import { DealType } from "../types";
import ServiceAPI from "./ServiceAPI";



class Deals extends ServiceAPI {
    private path : string 
    constructor() {
        super()
        this.path = 'api/deal'
    }
    public async createDeal(data: DealType){
        try {
            return await this.post(this.path, data)
        } catch (error) {
            return error
        }
    }
    async updateDeal(data:DealType){
        try {
            return await this.put(this.path, data)
        } catch (error) {
            return error
        }
    }
    async getDeal(id: string){
        try {
            return await this.get(`${this.path}/${id}`)
        } catch (error) {
            return error
        }
    }
    async deleteDeal(id: string){
        try {
            return await this.delete(`${this.path}/${id}`)
        } catch (error) {
            return error
        }
    }
    async getDeals (data :{} ) {
        try {
            return await this.get(this.path, data)
        } catch (error) {
            return error
        }
    }
}


export default new Deals()