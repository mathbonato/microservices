import Account from "../entity/Account";

export default interface AccountRepository {
	getAll(): Promise<any[]>;
	getById(id: string): Promise<any | null>;
	getByCpf(cpf: string): Promise<any | null>;
	create(account: Account): Promise<any>;
	update(id: string, params: {}): Promise<any | null>;
	delete(id: string): Promise<void>;
}