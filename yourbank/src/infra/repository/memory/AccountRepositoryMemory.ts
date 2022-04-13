import Account from "../../../domain/entity/Account";
import Cpf from "../../../domain/entity/Cpf";
import AccountRepository from "../../../domain/repository/AccountRepository";

export default class AccountRepositoryMemory implements AccountRepository {
	accounts: Account[];

	constructor () {
		this.accounts = [];
	}

    async getAll(): Promise<Account[]> {
        return this.accounts;
    }

    async getById(id: string): Promise<Account | undefined> {
        const account = this.accounts.find(account => account.id === id);
		if (!account) throw new Error("Order not found");
		return account;
    }

    async getByCpf(cpf: Cpf): Promise<Account | undefined> {
        const account = this.accounts.find(account => account.cpf === cpf);
		if (!account) throw new Error("Order not found");
		return account;
    }

    async create(account: Account): Promise<Account> {
        this.accounts.push(account);
        return account;
    }

    async update(id: string, updateAccount: Account): Promise<Account> {
        const accountIndex = this.accounts.findIndex(account => account.id === updateAccount.id);
        return this.accounts[accountIndex] = updateAccount;
    }

    async delete(id: string): Promise<Account[]> {
        return this.accounts = this.accounts.filter(account => account.id != id); 
    }
         
}