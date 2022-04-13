import { Request, Response } from 'express';
import CreateAccount from '../../application/usecase/create-account/CreateAccount';
import DeleteAccount from '../../application/usecase/delete-account/DeleteAccount';
import GetAccount from '../../application/usecase/get-account/GetAccount';
import GetAccounts from '../../application/usecase/get-accounts/GetAccounts';
import UpdateAccount from '../../application/usecase/update-account/UpdateAccount';
import Account from '../../domain/entity/Account';
export default class AccountController {

	constructor (readonly accountRepository: AccountRepository) {}

    async getAll (_request: Request, response: Response) {
		const getAccounts = new GetAccounts(this.accountRepository);
		const accounts = getAccounts.execute();
		return response.status(200).json(accounts);
	}

	async getById (request: Request, response: Response) {
		const getAccount = new GetAccount(this.accountRepository);
        const { id } = request.params;
		const account = getAccount.execute(id);
		return response.status(200).json(account);
	}

    async create (request: Request, response: Response) {
		const createAccount = new CreateAccount(this.accountRepository);
        const { cpf, name } = request.params;
        const newAccount = new Account(cpf, name);
        const account = await createAccount.execute(newAccount);
        return response.status(201).json(account);
	}

    async update (request: Request, response: Response) {
        const updateAccount = new UpdateAccount(this.accountRepository);
        const { id } = request.params;
        const updatedAccount = await updateAccount.execute(id, request.params);
		return response.status(200).json(updatedAccount);
	}

    async delete (request: Request, response: Response) {
        const deleteAccount = new DeleteAccount(this.accountRepository);
        const { id } = request.params;
		const removedAccount = await deleteAccount.execute(id);
		return response.status(200).json(removedAccount);
	}
}