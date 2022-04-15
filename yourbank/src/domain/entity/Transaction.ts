import  { v4 as uuidv4 } from 'uuid';

export default class Transaction {
    id?: string;
	type: string;
    amount: number;
    description: string;
    createdAt?: Date;

	constructor (type: string, amount: number, description: string, id?: string) {
        this.id = id ?? uuidv4();
        this.type = type;
		this.amount = amount;
        this.description = description;
        this.createdAt = new Date();
	}
}
