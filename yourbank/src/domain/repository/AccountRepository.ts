import Account from "../entity/Account";
import Cpf from "../entity/Cpf";

export default interface AccountRepository {
	getAll(): Promise<Account[]>;
	getById(id: string): Promise<Account | undefined>;
	getByCpf(cpf: Cpf): Promise<Account | undefined>;
	create(account: Account): Promise<Account>;
	update(id: string, params: {}): Promise<Account>;
	delete(id: string): Promise<Account[]>;
}