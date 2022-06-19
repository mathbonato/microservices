
import IRepositoryFactory from "../../domain/factory/IRepositoryFactory";
import IAccountRepository from "../../domain/repository/IAccountRepository";
import AccountRepository from "../repository/database/AccountRepository";

export default class RepositoryFactory implements IRepositoryFactory {

	createAccountRepository(): IAccountRepository {
		return new AccountRepository();
	}
}
