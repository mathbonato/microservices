import Account from "../../../domain/entity/Account";
import AccountRepository from "../../../domain/repository/AccountRepository";

export default class GetAccounts {
    
	constructor (readonly accountRepository: AccountRepository) {
		this.accountRepository = accountRepository;
	}

	async execute (): Promise<Account[] | []> {
        const accounts = await this.accountRepository.getAll();
		return accounts;
	}
}
