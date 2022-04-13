import Account from "../../../domain/entity/Account";
import AccountRepository from "../../../domain/repository/AccountRepository";

export default class DeleteAccount {
    
	constructor (readonly accountRepository: AccountRepository) {
		this.accountRepository = accountRepository;
	}

	async execute (id: string): Promise<Account | {}> {
		const account = await this.accountRepository.getById(id);
        if (!account) {
            return { message: "Account not found!" };
        }
        const deletedAccount = await this.accountRepository.delete(id);		
		return deletedAccount;
	}
}
