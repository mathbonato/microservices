import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import AccountRepository from "../../domain/repository/AccountRepository";
import AccountRepositoryMemory from "../repository/memory/AccountRepositoryMemory";

export default class MemoryRepositoryFactory implements RepositoryFactory {

	createAccountRepository(): AccountRepository {
		return new AccountRepositoryMemory();
	}
}
