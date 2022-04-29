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
import { viaCep } from '../service/viaCep';

export default class AccountsController {
    repositoryFactory: RepositoryFactory;

	constructor (repository: RepositoryFactory) {
        this.repositoryFactory = repository;
    }

    async getAll (_request: Request, response: Response) {
        try {
            const getAccounts = new GetAccounts(this.repositoryFactory);
            const accounts = await getAccounts.execute();
            return response.status(200).json(accounts);
        } catch (error: any) {
            return response.status(400).json({ message: error });
        }
	}

	async getById (request: Request, response: Response) {
        try {
            const getAccount = new GetAccount(this.repositoryFactory);
            const { id } = request.params;
            const account = await getAccount.execute(id);
            return response.status(200).json(account);
        } catch (error: any) {
            return response.status(400).json({ message: error });
        }
	}

    async create (request: Request, response: Response) {
        try {
            const createAccount = new CreateAccount(this.repositoryFactory);
            const { cpf, name, email, zipCode } = request.body;
            const { street, complement, district, state } = new viaCep().getAddress(zipCode)
            const newAccount = new Account(cpf, name, email, zipCode, street, complement, district, state);
            const account = await createAccount.execute(newAccount);
            return response.status(201).json(account);
        } catch (error: any) {
            return response.status(400).json({ message: error });
        }
	}

    async update (request: Request, response: Response) {
        try {
            const updateAccount = new UpdateAccount(this.repositoryFactory);
            const { id } = request.params;
            const updatedAccount = await updateAccount.execute(id, request.body);
            return response.status(200).json(updatedAccount);
        } catch (error: any) {
            return response.status(400).json({ message: error });
        }
	}

    async delete (request: Request, response: Response) {
        try {
            const deleteAccount = new DeleteAccount(this.repositoryFactory);
            const { id } = request.params;
            await deleteAccount.execute(id);
            return response.status(200).json({ message: "Account deleted!"});
        } catch (error: any) {
            return response.status(400).json({ message: error });
        }
	}

    async deposits (request: Request, response: Response) {
        try {
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
        } catch (error: any) {
            return response.status(400).json({ message: error });
        }
	}

    async withdrawals (request: Request, response: Response) {
        try {
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
        } catch (error: any) {
            return response.status(400).json({ message: error });
        }
	}

    async getBalanceById (request: Request, response: Response) {
        try {
            const getBalance = new GetBalance(this.repositoryFactory);
            const { id } = request.params;
            const balance = await getBalance.execute(id);
            return response.status(201).json(balance); 
        } catch (error: any) {
            return response.status(400).json({ message: error });
        }
	}
}