import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { routes } from './infra/config/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../swagger.json';
import { RabbitMQService } from './infra/service/RabbitMQ';

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(routes);

const startServer = () => {
    console.log("Server is running at port 3000!");
    const rabbit = new RabbitMQService();
    rabbit.consume();
}

app.listen("3000", () => startServer());
