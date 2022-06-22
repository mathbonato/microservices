import Account from "../../../domain/entity/Account";
import Transaction from "../../../domain/entity/Transaction";
import RepositoryFactory from "../../../domain/factory/IRepositoryFactory";
import IAccountRepository from "../../../domain/repository/IAccountRepository";
import { PubSubService } from "../../../infra/service/PubSub";
import { RabbitMQService } from "../../../infra/service/RabbitMQ";

export default class CreateWithdraw {
    accountRepository: IAccountRepository;
    mailService: any;
    feesService: any;

    
	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
        this.mailService = new PubSubService();
        this.feesService = new RabbitMQService();;
	}

	async execute (id: string, withdraw: Transaction): Promise<Account> {
		const persistedAccount = await this.accountRepository.getById(id);
        const account = new Account(persistedAccount.cpf, persistedAccount.name, persistedAccount.email, persistedAccount.birthdate, persistedAccount.id);
        if (!account) throw "Account not found!";
        account.withdraw(withdraw);
        const payload = { 
            email: account.email, 
            subject: 'Saque efetuado!', 
            body: `Olá  ${account.name}, saque de R$ ${withdraw.amount} efetuado com sucesso na data ${withdraw.createdAt}!` }
        this.mailService.publish(payload);
        this.feesService.publish({ customerId: account.id, amount: withdraw.amount });
		return account;
	}
}
