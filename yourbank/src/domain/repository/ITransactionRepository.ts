import Transaction from "../entity/Transaction";

export default interface TransactionRepository {
	getTransactionsByAccountId(id: string): Promise<Transaction[] | null>;
	create(transaction: Transaction): Promise<any>;
}