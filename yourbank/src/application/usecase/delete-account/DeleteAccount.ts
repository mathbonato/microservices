import axios from "axios";
import Account from "../../../domain/entity/Account";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AccountRepository from "../../../domain/repository/AccountRepository";

export default class DeleteAccount {
	accountRepository: AccountRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
	}

	async execute (id: string): Promise<Account | {}> {
		const account = await this.accountRepository.getById(id);
        if (!account) {
            return { message: "Account not found!" };
        }
        const deletedAccount = await this.accountRepository.delete(id);	
		axios.post("http://localhost:8080/email/enviar",{
            "sendTo": "sdartfgdekljtueajc@bvhrk.com",
            "subject":"Remoção da conta",
            "body": ` ${account.name} sua conta de cpf ${account.cpf} foi removida`
        }).then((res)=>console.log(res.data)).catch(console.error)	
		return deletedAccount;
	}
}
