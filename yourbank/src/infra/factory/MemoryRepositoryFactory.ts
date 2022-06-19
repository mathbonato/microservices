import RepositoryFactory from "../../domain/factory/IRepositoryFactory";
import IAccountRepository from "../../domain/repository/IAccountRepository";
import AccountRepositoryMemory from "../repository/memory/AccountRepositoryMemory";

export default class MemoryRepositoryFactory implements RepositoryFactory {

	createAccountRepository(): IAccountRepository {
		return new AccountRepositoryMemory();
	}
}
