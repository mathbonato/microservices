import Account from "../../../domain/entity/Account";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AccountRepository from "../../../domain/repository/AccountRepository";

export default class GetAccount {
    accountRepository: AccountRepository;

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
