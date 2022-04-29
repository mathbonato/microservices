import Account from "../../../domain/entity/Account";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AccountRepository from "../../../domain/repository/AccountRepository";
import { EmailSender } from "../../../infra/service/EmailSender";
import { ViaCepService } from "../../../infra/service/ViaCepService";

export default class CreateAccount {
    accountRepository: AccountRepository;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
	}

	async execute (account: Account): Promise<Account> {
        const customerAlreadyExists = await this.accountRepository.getByCpf(account.cpf);
        if (customerAlreadyExists) {
            throw "Account already exists!";
        }
        const viaCepService = new ViaCepService();
        const { street, complement, district, state } = await viaCepService.getAddress(account.zipCode || '');
        account.street = street;
        account.complement = complement;
        account.district = district; 
        account.state = state;
        const createdAccount = await this.accountRepository.create(account);
        if (!createdAccount) {
            throw "Error on create account!";
        }
        const body=`Bem vindo ${account.name}`
		//new EmailSender().send("email","Conta criada com sucesso",body);
        return createdAccount;
	}
}
