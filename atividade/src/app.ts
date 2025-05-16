import express from 'express';
import petRoutes from '../src/routes/pet.Routes';
const app = express();

app.use(express.json());  // Middleware para parsear JSON no corpo da requisição
app.use('/api', petRoutes); // Usando as rotas definidas para pets

export default app;
