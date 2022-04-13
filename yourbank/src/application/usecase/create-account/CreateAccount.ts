import Account from "../../../domain/entity/Account";
import AccountRepository from "../../../domain/repository/AccountRepository";

export default class CreateOrder {
    
	constructor (readonly accountRepository: AccountRepository) {
		this.accountRepository = accountRepository;
	}

	async execute (account: Account): Promise<Account | {}> {
        const customerAlreadyExists = await this.accountRepository.getByCpf(account.cpf);
        if (customerAlreadyExists) {
            return { message: "Account already exists!" };
        }
        const createdAccount = await this.accountRepository.create(account);
        if (createdAccount) {
            return { message: "Error on create account!" };
        }
        return createdAccount;
	}
}
