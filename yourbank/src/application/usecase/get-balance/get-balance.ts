import RepositoryFactory from "../../../domain/factory/IRepositoryFactory";
import IAccountRepository from "../../../domain/repository/IAccountRepository";
import { PubSubService } from "../../../infra/service/PubSub";

export default class GetBalance {
    accountRepository: IAccountRepository;
    mailService: any;
    
	constructor (readonly repositoryFactory: RepositoryFactory) {
		this.accountRepository = repositoryFactory.createAccountRepository();
        this.mailService = new PubSubService();
	}

	async execute (id: string): Promise<Number | {}> {
		const account = await this.accountRepository.getById(id);
        if (!account) return { message: "Account not found!" };
        const balance = account.getBalance();
        const payload = { 
            email: account.email, 
            subject: 'Consulta de saldo!', 
            body: `Olá ${account.name}, seu saldo atual é R$${balance}!` }
        this.mailService.publish(payload);
		return balance;
	}
}
