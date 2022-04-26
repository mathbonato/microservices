import axios from "axios";
import Account from "../../../domain/entity/Account";
import Transaction from "../../../domain/entity/Transaction";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AccountRepository from "../../../domain/repository/AccountRepository";
import { EmailSender } from "../../../infra/service/EmailSender";

export default class CreateDeposit {
    accountRepository: AccountRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
	}

	async execute (id: string, deposit: Transaction): Promise<Account> {
		const account = await this.accountRepository.getById(id);
        if (!account) { 
			throw "Account not found!";
		}
        account.deposit(deposit);
		const body=`Olá  ${account.name}, depósito efetuado com sucesso no valor de R$${deposit.amount} na data ${deposit.createdAt}`
		new EmailSender().send("email","Depósito sucedido!",body);
		return account;
	}
}
