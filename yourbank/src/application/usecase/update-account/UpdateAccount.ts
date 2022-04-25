import axios from "axios";
import Account from "../../../domain/entity/Account";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AccountRepository from "../../../domain/repository/AccountRepository";
import { EmailSender } from "../../../infra/service/EmailSender";

export default class UpdateAccount {
    accountRepository: AccountRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
	}

	async execute (id: string, params: {}): Promise<Account | {}> {
		const account = await this.accountRepository.getById(id);
        if (!account) {
            return { message: "Account not found!" };
        }
        const updatedAccount = await this.accountRepository.update(id, params);
        if (!updatedAccount) {
            return { message: "Error on update account!" };
        }
   
        const body=  `Olá ${account.name}, seus dados foram alterados com sucesso!`
		new EmailSender().send("email","Alteração nos dados da conta",body);
		return updatedAccount;
	}
}
