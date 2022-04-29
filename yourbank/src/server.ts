import express from 'express';
import { routes } from './infra/config/routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from '../swagger.json';

const app = express();
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(routes);

app.listen("3000", () => console.log("Server is running!"));