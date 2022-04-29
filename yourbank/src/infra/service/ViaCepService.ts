import axios from "axios";

interface IAddress {
    city: string;
    district: string,
    state: string,
    complement: string,
    street: string
}

export class ViaCepService {
    address: IAddress = {} as IAddress;

    public async getAddress (zipcode: string ): Promise<IAddress> {
        const res = await axios.get(`http://www.viacep.com.br/ws/${zipcode}/json`);
        this.address = { 
            city: res.data["localidade"],
            district: res.data["bairro"], 
            street: res.data["logradouro"], 
            complement: res.data["complemento"], 
            state: res.data["uf"] 
        };
        return this.address;
    }
}
