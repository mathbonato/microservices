
import  { v4 as uuidv4 } from 'uuid';
import Cpf from './Cpf';
import Statement from './Statement';

export default class Account {
	id: string;
    cpf: Cpf;
	name: string;
	private statement: Statement[];

	constructor (cpf: string, name: string, id?: string) {
        this.id = id ?? uuidv4();
		this.cpf = new Cpf(cpf);
        this.name = name;
        this.statement = []
	}

    deposit (statement: Statement) {
        this.statement.push(new Statement(statement.type, statement.amount, statement.description));
    }

    withdraw (statement: Statement) {
        this.statement.push(new Statement(statement.type, statement.amount, statement.description));
    }

    getBalance () {
        const balance = this.statement.reduce((acc: number, operation: { type: string, amount: number }) => {
            if (operation.type === 'credit') {
                return acc + operation.amount;
            } else {
                return acc - operation.amount;
            }
        }, 0)
        return balance;
    }
}
