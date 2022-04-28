import axios from "axios";

export class viaCep{
    public getAddress (zipCode: string ): void{
        axios.get(`viacep.com.br/ws/${zipCode}/json`).then((res)=>console.log(res.data)).catch(console.error)
    }
}