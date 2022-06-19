import Account from "../../../domain/entity/Account";
import IAccountRepository from "../../../domain/repository/IAccountRepository";

let accounts: Account[] = [];

export default class AccountRepositoryMemory implements IAccountRepository {

    async getAll(): Promise<Account[]> {
        return accounts;
    }

    async getById(id: string): Promise<Account | null> {
        return accounts.find(account => account.id === id) || null;
    }

    async getByCpf(cpf: string): Promise<Account | null> {
        return accounts.find(account => account.cpf === cpf) || null;
    }

    async create(account: Account): Promise<Account> {
        console.log('Passei aqui 2')
        accounts.push(account);
        return account;
    }

    async update(id: string, updateAccount: Account): Promise<Account | null> {
        const account = accounts.find(account => account.id === id);
        if (!account) return null;
        if (updateAccount.cpf) account.cpf = updateAccount.cpf;
        if (updateAccount.name) account.name = updateAccount.name;
        const accountIndex = accounts.findIndex(account => account.id === id);
        return accounts[accountIndex] = account;
    }

    async delete(id: string): Promise<void> {
        accounts = accounts.filter(account => account.id != id);
    }
}