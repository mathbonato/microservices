import Account from "../../../domain/entity/Account";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AccountRepository from "../../../domain/repository/AccountRepository";

export default class CreateOrder {
    accountRepository: AccountRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
	}

	async execute (account: Account): Promise<Account | {}> {
        const customerAlreadyExists = await this.accountRepository.getByCpf(account.cpf);
        if (customerAlreadyExists) {
            return { message: "Account already exists!" };
        }
        const createdAccount = await this.accountRepository.create(account);
        if (!createdAccount) {
            return { message: "Error on create account!" };
        }
        return createdAccount;
	}
}
