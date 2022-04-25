import axios from "axios";
import Account from "../../../domain/entity/Account";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AccountRepository from "../../../domain/repository/AccountRepository";

export default class UpdateAccount {
    accountRepository: AccountRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
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
        axios.post("http://localhost:8080/email/enviar",{
            "sendTo": "sdartfgdekljtueajc@bvhrk.com",
            "subject":"Alteração nos dados da conta",
            "body": `Olá  ${account.name}, seus dados foram alterados com sucesso!`
        }).then((res)=>console.log(res.data)).catch(console.error)
		return updatedAccount;
	}
}
