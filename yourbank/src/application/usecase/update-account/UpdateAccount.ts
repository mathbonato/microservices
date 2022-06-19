import axios from "axios";
import Account from "../../../domain/entity/Account";
import RepositoryFactory from "../../../domain/factory/IRepositoryFactory";
import IAccountRepository from "../../../domain/repository/IAccountRepository";
import { PubSubService } from "../../../infra/service/PubSub";

export default class UpdateAccount {
    accountRepository: IAccountRepository;
    mailService: any;
    
	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
        this.mailService = new PubSubService();
	}

	async execute (id: string, params: {}): Promise<Account> {
		const account = await this.accountRepository.getById(id);
        if (!account) {
            throw "Account not found!";
        }
        const updatedAccount = await this.accountRepository.update(id, params);
        if (!updatedAccount) {
            throw "Error on update account!";
        }
        const payload = { 
            email: account.email, 
            subject: 'Alteração nos dados da conta!', 
            body: `Olá ${account.name}, seus dados foram alterados com sucesso!` }
        this.mailService.publish(payload);
		return updatedAccount;
	}
}
