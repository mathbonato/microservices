import Account from "../../../domain/entity/Account";
import AccountRepository from "../../../domain/repository/AccountRepository";

let accounts: Account[] = [];

export default class AccountRepositoryMemory implements AccountRepository {

	constructor () {}

    getAll(): Account[] {
        return accounts;
    }

    getById(id: string): Account | undefined {
        return accounts.find(account => account.id === id);
    }

    getByCpf(cpf: string): Account | undefined {
        return accounts.find(account => account.cpf === cpf);
    }

    create(account: Account): Account {
        accounts.push(account);
        return account;
    }

    update(id: string, updateAccount: Account): Account | undefined {
        const account = accounts.find(account => account.id === id);
        if (!account) return undefined;
        if (updateAccount.cpf) account.cpf = updateAccount.cpf;
        if (updateAccount.name) account.name = updateAccount.name;
        const accountIndex = accounts.findIndex(account => account.id === id);
        return accounts[accountIndex] = account;
    }

    delete(id: string): Account[] {
        accounts = accounts.filter(account => account.id != id);
        return accounts; 
    }
}