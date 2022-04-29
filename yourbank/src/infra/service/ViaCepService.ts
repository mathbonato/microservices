import axios from "axios";

interface IAddress {
    district: string,
    state: string,
    complement: string,
    street: string
}

export class ViaCepService {
    address: IAddress = {} as IAddress;

    public async getAddress (zipCode: string ): Promise<IAddress> {
        const res = await axios.get(`http://www.viacep.com.br/ws/${zipCode}/json`);
        this.address = { district: res.data["bairro"], street: res.data["logradouro"], complement: res.data["complemento"], state: res.data["uf"] };
        return this.address;
    }
}
