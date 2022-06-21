import { Transaction } from '@prisma/client';
import ITransactionRepository from '../../../domain/repository/ITransactionRepository';
import { prisma } from './prismaClient';

export default class TransactionRepository implements ITransactionRepository {
 
    async getTransactionsByAccountId(id: string): Promise<Transaction[] | null> {
        const transactions = await prisma.transaction.findMany({
            where: {
              customerId: id,
            },
          });
          return transactions;
    }

    async create(payload: any): Promise<any> {
        const account = await prisma.transaction.create({
          data: {
           amount: payload.amount,
           type: payload.type,
           description: payload.description,
           customer: { connect: { id: payload.customerId } }
          },
        });
        return account;
    }
}
