import Account from "../../../domain/entity/Account";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AccountRepository from "../../../domain/repository/AccountRepository";
import { PubSubService } from "../../../infra/service/PubSub";

export default class DeleteAccount {
	accountRepository: AccountRepository;
    mailService: any;
    
	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
        this.mailService = new PubSubService();
	}

	async execute (id: string): Promise<Account[]> {
		const account = await this.accountRepository.getById(id);
        if (!account) {
            throw "Account not found!";
        }
        const deletedAccount = await this.accountRepository.delete(id);	
        const payload = { 
            email: account.email, 
            subject: 'Conta removida com sucesso!', 
            body: `${account.name}, sua conta de cpf ${account.cpf} foi removida!` }
        this.mailService.publish(payload);
		return deletedAccount;
	}
}
