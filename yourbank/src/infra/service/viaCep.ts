import axios from "axios";

interface iAddress {
    district: string,
    state: string,
    complement: string,
    street: string
}

export class viaCep{
    public getAddress (zipCode: string ): iAddress {
        let address: any = {};
        axios.get(`http://www.viacep.com.br/ws/${zipCode}/json`).then((res)=> address = res.data).catch(console.error);
        return { street:address.logradouro, complement:address.complemento, district:address.bairro, state:address.uf };
    }
}


