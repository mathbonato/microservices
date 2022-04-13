import ExpressHttp from "./infra/http/ExpressHttp";
import Router from "./infra/http/Router";
import AccountRepositoryMemory from "./infra/repository/memory/AccountRepositoryMemory";

const accountRepository = new AccountRepositoryMemory();
const http = new ExpressHttp();
const router = new Router(http, accountRepository);
router.init();
http.listen(3001);