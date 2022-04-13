import Account from "../../../domain/entity/Account";
import AccountRepository from "../../../domain/repository/AccountRepository";

export default class GetAccount {
    
	constructor (readonly accountRepository: AccountRepository) {
		this.accountRepository = accountRepository;
	}

	async execute (id: string): Promise<Account | {}> {
        const account = await this.accountRepository.getById(id);
		if (!account) {
            return { message: "Account not found!" };
        }
		return account;
	}
}
