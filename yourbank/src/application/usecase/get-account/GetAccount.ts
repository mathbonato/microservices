import Account from "../../../domain/entity/Account";
import RepositoryFactory from "../../../domain/factory/IRepositoryFactory";
import IAccountRepository from "../../../domain/repository/IAccountRepository";

export default class GetAccount {
    accountRepository: IAccountRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
	}

	async execute (id: string): Promise<Account> {
        const account = await this.accountRepository.getById(id);
		if (!account) {
        	throw "Account not found!";
        }
		return account;
	}
}
