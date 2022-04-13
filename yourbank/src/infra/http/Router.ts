import AccountRepository from "../../domain/repository/AccountRepository";
import AccountController from "../controller/AccountController";
import Http from "./Http";

export default class Router {

	constructor (readonly http: Http, readonly accountRepository: AccountRepository) {
	}

	init () {
		this.http.route("get", "/accounts",  new AccountController(this.accountRepository).getAll);
		this.http.route("get", "/accounts/:id",  new AccountController(this.accountRepository).getById);
        this.http.route("post", "/accounts",  new AccountController(this.accountRepository).create);
        this.http.route("put", "/accounts/:id",  new AccountController(this.accountRepository).update);
        this.http.route("put", "/accounts/:id",  new AccountController(this.accountRepository).delete);
	}
}
