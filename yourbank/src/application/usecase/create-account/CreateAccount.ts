import Account from "../../../domain/entity/Account";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AccountRepository from "../../../domain/repository/AccountRepository";
import axios from "axios";

export default class CreateOrder {
    accountRepository: AccountRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
	}

	async execute (account: Account): Promise<Account | {}> {
        const customerAlreadyExists = await this.accountRepository.getByCpf(account.cpf);
        if (customerAlreadyExists) {
            return { message: "Account already exists!" };
        }
        const createdAccount = await this.accountRepository.create(account);
        if (!createdAccount) {
            return { message: "Error on create account!" };
        }
        axios.post("http://localhost:8080/email/enviar",{
            "sendTo": "sdartfgdekljtueajc@bvhrk.com",
            "subject":"Criação da conta",
            "body": `Bem vindo ${account.name}`
        }).then((res)=>console.log(res.data)).catch(console.error)
        return createdAccount;
	}
}
