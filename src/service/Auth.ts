import { UserType } from "../types";
import ServiceAPI from "./ServiceAPI";


class Auth extends ServiceAPI {
    private path : string
    private user : string
    constructor() {
        super();
        this.path = 'auth'
        this.user = 'user'
    }

    public async signIn(data: {email: string, password: string}) {
        try {
            return await this.post(`${this.path}/signin`, undefined, this.basic(data))
        } catch (error) {
            return error
        }
    }
    public async signup(data: FormData | UserType) {
        try {
         return await this.post(`${this.path}/signup`, data)
        } catch (error) {
            return error
        }
    }
    public async getMyProfile(){
        try {
            return await this.get('me')
        } catch (error) {
            return error
        }
    }
    async updateImage(data:FormData){
        try {
            return await this.post('avatar', data)
        } catch (error) {
            return error
        }
    }
    async logout() {
        try {
            return await this.post('logout')
        } catch (error) {
            return error
        }
    }
}

export default new Auth()