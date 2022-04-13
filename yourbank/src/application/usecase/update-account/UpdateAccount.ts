import Account from "../../../domain/entity/Account";
import AccountRepository from "../../../domain/repository/AccountRepository";

export default class UpdateAccount {
    
	constructor (readonly accountRepository: AccountRepository) {
		this.accountRepository = accountRepository;
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
		return account;
	}
}
