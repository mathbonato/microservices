import Account from "../../../domain/entity/Account";
import Transaction from "../../../domain/entity/Transaction";
import RepositoryFactory from "../../../domain/factory/IRepositoryFactory";
import IAccountRepository from "../../../domain/repository/IAccountRepository";
import { PubSubService } from "../../../infra/service/PubSub";

export default class CreateDeposit {
    accountRepository: IAccountRepository;
    mailService: any;
    
	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
        this.mailService = new PubSubService();
	}

	async execute (id: string, deposit: Transaction): Promise<Account> {
		const account = await this.accountRepository.getById(id);
        if (!account) { 
			throw "Account not found!";
		}
        account.deposit(deposit);
        const payload = { 
            email: account.email, 
            subject: 'Depósito sucedido!', 
            body: `Olá  ${account.name}, depósito de R$ ${deposit.amount} efetuado com sucesso na data ${deposit.createdAt}!` }
        this.mailService.publish(payload);
		return account;
	}
}
