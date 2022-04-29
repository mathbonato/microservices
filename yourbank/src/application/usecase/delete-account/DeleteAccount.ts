import axios from "axios";
import Account from "../../../domain/entity/Account";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AccountRepository from "../../../domain/repository/AccountRepository";
import { EmailSender } from "../../../infra/service/EmailSender";

export default class DeleteAccount {
	accountRepository: AccountRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
	}

	async execute (id: string): Promise<Account[]> {
		const account = await this.accountRepository.getById(id);
        if (!account) {
            throw "Account not found!";
        }
        const deletedAccount = await this.accountRepository.delete(id);	
		const body= ` ${account.name} sua conta de cpf ${account.cpf} foi removida`
		// new EmailSender().send("email","Conta removida com sucesso",body);
		return deletedAccount;
	}
}
