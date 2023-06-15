import axios, {  AxiosResponse, HeadersDefaults } from "axios"
import { load } from 'react-cookies'

class ServiceAPI {
    private API: string | undefined
    constructor() {
        this.API = process.env.REACT_APP_API
    }
    private bearer() {
        return load('token') ? { authorization: `Bearer ${load('token')}` } : {}
    }
    public basic (data:{email: string, password: string}) {
        return { authorization: `Basic ${btoa(`${data.email}:${data.password}`)}` }
    }
    public async post(path: string, data?: {}, headers?: {}) {
        try {
            const response =  await axios({
                method: 'post',
                data,
                url: `${this.API}/${path}`,
                headers: {
                 ...this.bearer(),
                 ...headers
                }
            })
            return response.data
        } catch (error) {
            return error
        }
    }
    public async get(path: string, params?: {}) {
        try {
            const response =await axios({
                method: 'get',
                params,
                url: `${this.API}/${path}`,
                headers: {
                    ...this.bearer()
                }
            })
            return response.data
        } catch (error) {
            return error
        }
    }
    public async delete(path: string) {
        try {
            const response =await axios({
                method: 'delete',
                url: `${this.API}/${path}`,
                headers: {
                    ...this.bearer()
                }
            })
            return  response.data
        } catch (error) {
            return error
        }
    }
    public async put(path: string, data: {}) {
        try {
            const response =await axios({
                method: 'put',
                data,
                url: `${this.API}/${path}`,
                headers: {
                    ...this.bearer()
                }
            })
            return response.data
        } catch (error) {
            return error
        }
    }

}

export default  ServiceAPI