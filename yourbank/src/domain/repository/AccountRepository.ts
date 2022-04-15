import Account from "../entity/Account";

export default interface AccountRepository {
	getAll(): Account[];
	getById(id: string): Account | undefined;
	getByCpf(cpf: string): Account | undefined;
	create(account: Account): Account;
	update(id: string, params: {}): Account | undefined;
	delete(id: string): Account[];
}