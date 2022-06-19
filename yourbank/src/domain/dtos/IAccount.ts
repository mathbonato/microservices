import { ITransaction } from "./ITransaction";

export interface IAccount {
    id: string
    cpf: string
    name: string
    email: string
    zipcode: string | null
    city: string | null
    street: string | null
    complement: string | null
    district: string | null
    state: string | null
    created_at: Date
    updated_at: Date
}
