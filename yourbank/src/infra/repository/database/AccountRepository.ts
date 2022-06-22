
import IAccountRepository from '../../../domain/repository/IAccountRepository';
import { prisma } from './prismaClient';

export default class AccountRepository implements IAccountRepository {
 
  async getAll(): Promise<any[]> {
     const accounts = await prisma.account.findMany({ include: { statement: true } });
        return accounts;
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
            birthdate: payload.birthdate,
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

    async update(id: string, params: any): Promise<any> {
        const account = await prisma.account.findUnique({
            where: { id },
        });
        
        const updateAccount = await prisma.account.update({
            where: {
            id: account?.id,
            },
            data: { name: params.name,
              email: params.email,
              cpf: params.cpf,
              birthdate: params.birthdate,
               updated_at: new Date() },
        });
        return updateAccount;
    }

    async delete(id: string): Promise<void> {
        await prisma.account.delete({
            where: {
              id,
            },
          });
    }
}
