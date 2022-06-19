import { Router } from 'express';
import AccountsController from '../controller/AccountsController';
import RepositoryFactory from '../factory/RepositoryFactory';
// import MemoryRepositoryFactory from '../factory/MemoryRepositoryFactory';

const routes = Router();
const repositoryFactory = new RepositoryFactory();
const accountController = new AccountsController(repositoryFactory);

routes.get("/accounts", (req, res) => {
    return accountController.getAll(req, res);
});

routes.get("/accounts/:id", (req, res) => {
    return accountController.getById(req, res);
});

routes.post("/accounts", (req, res) => {
    return accountController.create(req, res);
});
routes.put("/accounts/:id", (req, res) => {
    return accountController.update(req, res);
});

routes.delete("/accounts/:id", (req, res) => {
    return accountController.delete(req, res);
});

routes.post("/deposits/:id", (req, res) => {
    return accountController.deposits(req, res);
});

routes.post("/withdrawals/:id", (req, res) => {
    return accountController.withdrawals(req, res);
});

routes.get ("/balances/:id", (req, res) => {
    return accountController.getBalanceById(req, res);
});

export { routes };