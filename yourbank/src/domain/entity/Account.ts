
import  { v4 as uuidv4 } from 'uuid';
import TransactionRepository from '../../infra/repository/database/TransactionRepository';
import Cpf from './Cpf';
import Transaction from './Transaction';

export default class Account {
	id: string;
    cpf: string;
	name: string;
    email: string;
    zipcode?: string;
    city?: string;
    street?: string;
    complement?: string;
    district?: string;
    state?: string;

	constructor (cpf: string, name: string, email: string,  id?: string, zipcode?: string, city?: string, street?: string, complement?: string, district?: string, state?: string) {
        this.id = id ?? uuidv4();
		this.cpf = new Cpf(cpf).getValue();
        this.name = name;
        this.email = email;
        this.zipcode = zipcode;
        this.city = city;
        this.street = street;
        this.complement = complement;
        this.district = district;
        this.state = state;
	}

    deposit (transaction: Transaction) {
        const repository = new TransactionRepository();
        repository.create({ type: transaction.type, amount: transaction.amount, description: transaction.description, customerId: this.id });
    }

    withdraw (transaction: Transaction) {
        const repository = new TransactionRepository();
        repository.create({ type: transaction.type, amount: transaction.amount, description: transaction.description, customerId: this.id });
    }

    getBalance () {
        const repository = new TransactionRepository();
        const statement = repository.getTransactionsByAccountId(this.id);
        if (Array.isArray(statement)) {
            const balance = statement.reduce((acc: number, operation: { type: string, amount: number }) => {
                if (operation.type === 'deposit') {
                    return acc + operation.amount;
                } else {
                    return acc - operation.amount;
                }
            }, 0)
            return balance;
        }
    }
}
