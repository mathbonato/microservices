
import IAccountRepository from '../../../domain/repository/IAccountRepository';
import { prisma } from './prismaClient';

export default class AccountRepository implements IAccountRepository {
 
  async getAll(): Promise<any[]> {
    //  const accounts = await prisma.account.findMany({ include: { statement: true } });
        return [];
    }

    async getById(id: string): Promise<any | null> {
        const account = await prisma.account.findFirst({
            where: {
              id: id,
            },
          });
          return account;
    }

    async getByCpf(cpf: string): Promise<any | null> {
        const account = await prisma.account.findFirst({
            where: {
              cpf: cpf,
            },
          });
          return account;
    }

    async create(payload: any): Promise<any> {
        const account = await prisma.account.create({
          data: {
            cpf: payload.cpf,
            name: payload.name,
            email: payload.email,
            zipcode: payload.zipcode,
            city: payload.city,
            street: payload.street,
            complement: payload.complement,
            district: payload.district,
            state: payload.state
          },
        });
        return account;
    }

    async update(id: string, params: object): Promise<any> {
        const requestLog = await prisma.account.findUnique({
            where: { id },
        });
        
        const updateRequestLog = await prisma.account.update({
            where: {
            id: requestLog?.id,
            },
            data: { ...params, updated_at: new Date() },
        });
        return updateRequestLog;
    }

    async delete(id: string): Promise<void> {
        await prisma.account.delete({
            where: {
              id,
            },
          });
    }
}
