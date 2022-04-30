import axios from "axios";
import Account from "../../../domain/entity/Account";
import Transaction from "../../../domain/entity/Transaction";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AccountRepository from "../../../domain/repository/AccountRepository";
import { EmailSender } from "../../../infra/service/EmailSender";

export default class CreateWithdraw {
    accountRepository: AccountRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
	}

	async execute (id: string, withdraw: Transaction): Promise<Account> {
		const account = await this.accountRepository.getById(id);
        if (!account) throw "Account not found!";
        account.withdraw(withdraw);
		const body=`Olá  ${account.name}, saque efetuado com sucesso no valor de R$${withdraw.amount} na data ${withdraw.createdAt}`
		new EmailSender().send(`${account.email}`,"Saque efetuado!",body);
		return account;
	}
}
