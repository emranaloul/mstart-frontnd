export type UserType = {
    id?: string,
    name: string,
    phone: string
    email: string
    image?: string
    gender: string
    dateTime_UTC?: string
    update_datetime_utc?: string | null
    Server_DateTime?: string | null
    last_login_datetime_utc?: string | null
    status?: string
    date_of_birth?: string
    role?: string
    last_login?: string | null
    password? : string
    dateOfBirth? : string
}

export type DealType = {
    id?: string
    name: string
    description: string
    amount: number
    currency: string
    dateTime_utc?: string
    update_datetime_utc?: string | null
    status?: string
    Server_DateTime?: string | null
}

export type ParamsType = {limit: number,offset: number, id?: string} & {}

export type ReloadType = {
    onReload: (p: ParamsType) => void
    reloadParams: ParamsType
}

export type ClaimType = {
    id?: string
    user_id?: string
    deal_id: string
    amount: number
    currency: string
    Server_DateTime?: string | null
}