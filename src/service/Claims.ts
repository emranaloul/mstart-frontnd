import { ClaimType, DealType, ParamsType } from "../types";
import ServiceAPI from "./ServiceAPI";


class Claims extends ServiceAPI {
    private path: string
    constructor() {
        super()
        this.path = 'api/claim'
    }

    async createClaim(data: ClaimType) {
        try {
            return await this.post(this.path, data)
        } catch (error) {
            return error
        }
    }
    async getClaims(data : ParamsType & {user_id?: string} ){
        try {
            return await this.get(this.path, data)
        } catch (error) {
            return error
        }
    }
    async getClaimsDetails() {
        try {
            return await this.get(`${this.path}Detailed`)
        } catch (error) {
            return error
        }
    }
   
}

export default new Claims()