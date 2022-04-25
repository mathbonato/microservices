import axios from "axios";
import Account from "../../../domain/entity/Account";
import Transaction from "../../../domain/entity/Transaction";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AccountRepository from "../../../domain/repository/AccountRepository";

export default class CreateDeposit {
    accountRepository: AccountRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
	}

	async execute (id: string, deposit: Transaction): Promise<Account | {}> {
		const account = await this.accountRepository.getById(id);
        if (!account) return { message: "Account not found!" };
        account.deposit(deposit);
		axios.post("http://localhost:8080/email/enviar",{
            "sendTo": "sdartfgdekljtueajc@bvhrk.com",
            "subject":"Depósito sucedido",
            "body": `Olá  ${account.name} deposito efetuado com sucesso no valor de R$${deposit.amount} na data ${deposit.createdAt}`
        }).then((res)=>console.log(res.data)).catch(console.error)
		return account;
	}
}
