import { Request, Response } from 'express';
import CreateAccount from '../../application/usecase/create-account/CreateAccount';
import CreateDeposit from '../../application/usecase/create-deposit/CreateDeposit';
import CreateWithdraw from '../../application/usecase/create-withdraw/CreateWithdraw';
import DeleteAccount from '../../application/usecase/delete-account/DeleteAccount';
import GetAccount from '../../application/usecase/get-account/GetAccount';
import GetAccounts from '../../application/usecase/get-accounts/GetAccounts';
import GetBalance from '../../application/usecase/get-balance/get-balance';
import UpdateAccount from '../../application/usecase/update-account/UpdateAccount';
import Account from '../../domain/entity/Account';
import Transaction from '../../domain/entity/Transaction';
import RepositoryFactory from '../../domain/factory/RepositoryFactory';

export default class AccountsController {
    repositoryFactory: RepositoryFactory;

	constructor (repository: RepositoryFactory) {
        this.repositoryFactory = repository;
    }

    async getAll (_request: Request, response: Response) {
		const getAccounts = new GetAccounts(this.repositoryFactory);
		const accounts = await getAccounts.execute();
		return response.status(200).json(accounts);
	}

	async getById (request: Request, response: Response) {
		const getAccount = new GetAccount(this.repositoryFactory);
        const { id } = request.params;
		const account = await getAccount.execute(id);
		return response.status(200).json(account);
	}

    async create (request: Request, response: Response) {
		const createAccount = new CreateAccount(this.repositoryFactory);
        const { cpf, name } = request.body;
        const newAccount = new Account(cpf, name);
        const account = await createAccount.execute(newAccount);
        return response.status(201).json(account);
	}

    async update (request: Request, response: Response) {
        const updateAccount = new UpdateAccount(this.repositoryFactory);
        const { id } = request.params;
        const updatedAccount = await updateAccount.execute(id, request.body);
		return response.status(200).json(updatedAccount);
	}

    async delete (request: Request, response: Response) {
        const deleteAccount = new DeleteAccount(this.repositoryFactory);
        const { id } = request.params;
		const removedAccount = await deleteAccount.execute(id);
		return response.status(200).json({ message: "Account deleted!"});
	}

    async deposits (request: Request, response: Response) {
		const createDeposit = new CreateDeposit(this.repositoryFactory);
        const { id } = request.params;
        const { amount, description } = request.body;
        const deposit: Transaction = {
            type: 'deposit',
            amount, 
            description 
        };
        const account = await createDeposit.execute(id, deposit);
        return response.status(201).json({ message: "Deposit made successfully!" });
	}

    async withdrawals (request: Request, response: Response) {
		const createWithdraw = new CreateWithdraw(this.repositoryFactory);
        const { id } = request.params;
        const { amount, description } = request.body;
        const withdraw: Transaction = {
            type: 'withdraw',
            amount, 
            description 
        };
        const account = await createWithdraw.execute(id, withdraw);
        return response.status(201).json({ message: "Withdraw made successfully!" });
	}

    async getBalanceById (request: Request, response: Response) {
		const getBalance = new GetBalance(this.repositoryFactory);
        const { id } = request.params;
        const balance = await getBalance.execute(id);
        return response.status(201).json(balance);
	}
}