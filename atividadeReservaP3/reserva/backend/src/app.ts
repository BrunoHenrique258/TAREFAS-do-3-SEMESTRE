import express from 'express';
import reservaRoutes from './routes/reservaRoutes';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Para interpretar JSON no body das requisições

// Rotas
app.use('/api/reservas', reservaRoutes);

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('API do sistema de reservas funcionando!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
