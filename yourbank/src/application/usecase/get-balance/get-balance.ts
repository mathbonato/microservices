import axios from "axios";
import Account from "../../../domain/entity/Account";
import Transaction from "../../../domain/entity/Transaction";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AccountRepository from "../../../domain/repository/AccountRepository";
import { EmailSender } from "../../../infra/service/EmailSender";

export default class GetBalance {
    accountRepository: AccountRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
	}

	async execute (id: string): Promise<Number | {}> {
		const account = await this.accountRepository.getById(id);
        if (!account) return { message: "Account not found!" };
        const balance = account.getBalance();
		const body= `Olá ${account.name}, seu saldo atual é R$${balance}`;
		new EmailSender().send(`${account.email}`,"Consulta de saldo",body);
		return balance;
	}
}
