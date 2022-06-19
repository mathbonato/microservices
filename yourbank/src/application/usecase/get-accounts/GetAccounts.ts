import Account from "../../../domain/entity/Account";
import RepositoryFactory from "../../../domain/factory/IRepositoryFactory";
import IAccountRepository from "../../../domain/repository/IAccountRepository";

export default class GetAccounts {
    accountRepository: IAccountRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
	}

	async execute (): Promise<Account[] | []> {
        const accounts = await this.accountRepository.getAll();
		return accounts;
	}
}
