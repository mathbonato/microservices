import IAccountRepository from "../repository/IAccountRepository";

export default interface IRepositoryFactory {
	createAccountRepository(): IAccountRepository;
}
