import Account from "../../../domain/entity/Account";
import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import AccountRepository from "../../../domain/repository/AccountRepository";
import { PubSubService } from "../../../infra/service/PubSub";
import { ViaCepService } from "../../../infra/service/ViaCepService";

export default class CreateAccount {
    accountRepository: AccountRepository;
    mailService: any;

	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
        this.mailService = new PubSubService();
	}

	async execute (account: Account): Promise<Account> {
        const customerAlreadyExists = await this.accountRepository.getByCpf(account.cpf);
        if (customerAlreadyExists) {
            throw "Account already exists!";
        }
        const viaCepService = new ViaCepService();
        const { street, complement, district, state, city } = await viaCepService.getAddress(account.zipcode || '');
        account.street = street;
        account.city = city;
        account.complement = complement;
        account.district = district; 
        account.state = state;
        const createdAccount = await this.accountRepository.create(account);
        if (!createdAccount) {
            throw "Error on create account!";
        }
        const payload = { email: account.email, subject: 'Conta criada com sucesso', body: `Bem vindo ${account.name}` }
        this.mailService.publish(payload);
        return createdAccount;
	}
}
