import Account from "../../../domain/entity/Account";
import RepositoryFactory from "../../../domain/factory/IRepositoryFactory";
import IAccountRepository from "../../../domain/repository/IAccountRepository";
import { PubSubService } from "../../../infra/service/PubSub";
import { RabbitMQService } from "../../../infra/service/RabbitMQ";
import { ViaCepService } from "../../../infra/service/ViaCepService";

export default class CreateAccount {
    accountRepository: IAccountRepository;
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
        const payload = { email: account.email, subject: 'OK', body: `HEllo ${account.name}` }
        this.mailService.publish(payload);
        const rabbit = new RabbitMQService();
        rabbit.publish(payload);
        return createdAccount;
	}
}
