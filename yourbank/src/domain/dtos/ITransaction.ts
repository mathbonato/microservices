export interface ITransaction {
    id?: string;
	type: string;
    amount: number;
    description: string;
    createdAt?: Date;
}