import axios from "axios";

export class viaCep{
    public getAddress (zipCode: string ): {} {
        let address = {};
        axios.get(`http://www.viacep.com.br/ws/${zipCode}/json`).then((res)=> address = res.data).catch(console.error);
        return address;
    }
}