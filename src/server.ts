import express, { Response, Request } from 'express';
import  { v4 as uuidv4 } from 'uuid';

const app = express()

app.use(express.json())

export interface ICustomer { 
    id: string, 
    cpf: string,
    name: string, 
    statement: any[] 
}

const customers: ICustomer[] = []

function getBalance(statement: any[]) {
    const balance = statement.reduce((acc: any, operation: any) => {
        if (operation.type === 'credit') {
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    }, 0)

    return balance;
}

function findCustomerByCpf(cpf: any): ICustomer | undefined {
    return customers.find(customer => customer.cpf === cpf);
}

app.post("/accounts", (request: Request, response: Response) => {
    const id = uuidv4();
    const { cpf, name } = request.body;
    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf)
    if (customerAlreadyExists) {
        return response.status(400).json({ message: "Customer already exists!" });
    } else {
        customers.push({ id, cpf, name, statement: [] });
        const customer = customers.find((customer) => customer.cpf === cpf)
        return response.status(201).json(customer);
    }
})

app.put("/accounts", (request: Request, response: Response) => {
    const customer = findCustomerByCpf(request.params.cpf); 

    if (!customer) {
        return response.status(400).json({ message: "Customer not found!" });
    }

    const { name } = request.body;
    customer.name = name;
    return response.status(200).json(customer);
})

app.get("/accounts", (request: Request, response: Response) => {
    const customer = findCustomerByCpf(request.params.cpf); 
    return response.status(201).json(customer);
})

app.delete("/accounts", (request: Request, response: Response) => {
    const customer = findCustomerByCpf(request.params.cpf);

    if (!customer) {
        return response.status(400).json({ message: "Customer not found!" });
    }

    customers.filter(c => c.id != customer.id);
    return response.status(200).json(customers);
})

app.get("/statements", (request: Request, response: Response) => {
    const customer = findCustomerByCpf(request.params.cpf); 

    if (!customer) {
        return response.status(400).json({ message: "Customer not found!" });
    }

    return response.status(201).json(customer.statement);
})

app.post("/deposits", (request: Request, response: Response) => {
    const { description, amount } = request.body;
    const customer = findCustomerByCpf(request.params.cpf);

    if (!customer) {
        return response.status(400).json({ message: "Customer not found!" });
    }

    const statementOperation = {
        description,
        amount,
        type: 'credit',
        createdAt: new Date()
    }
    customer.statement.push(statementOperation)
    return response.status(201).json(customer);
})

app.post("/withdrawals", (request: Request, response: Response) => {
    const { amount } = request.body;
    const customer = findCustomerByCpf(request.params.cpf);

    if (!customer) {
        return response.status(400).json({ message: "Customer not found!" });
    }

    const balance = getBalance(customer.statement) 
    
    if (balance < amount) {
        return response.status(400).json({ message: "Insufficient funds!" });
    } else {
        const statementOperation = {
            amount,
            type: 'debit',
            createdAt: new Date()
        }

        customer.statement.push(statementOperation)
        return response.status(201).json(customer);
    }
})

app.get("/balances", (request: Request, response: Response) => {
    const customer = findCustomerByCpf(request.params.cpf);

    if (!customer) {
        return response.status(400).json({ message: "Customer not found!" });
    }

    const balance = getBalance(customer.statement) 
    return response.status(201).json(balance);
})

app.listen('3000')
