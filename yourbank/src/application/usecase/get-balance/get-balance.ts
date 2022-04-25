import axios from "axios";
import Account from "../../../domain/entity/Account";
import Transaction from "../../../domain/entity/Transaction";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AccountRepository from "../../../domain/repository/AccountRepository";

export default class GetBalance {
    accountRepository: AccountRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
	}

	async execute (id: string): Promise<Number | {}> {
		const account = await this.accountRepository.getById(id);
        if (!account) return { message: "Account not found!" };
        const balance = account.getBalance();
		axios.post("http://localhost:8080/email/enviar",{
            "sendTo": "sdartfgdekljtueajc@bvhrk.com",
            "subject":"Consulta de saldo",
            "body": `Olá ${account.name} seu saldo atual é R$${balance}`
        }).then((res)=>console.log(res.data)).catch(console.error)
		return balance;
	}
}
