import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import eventoRoutes from './routes/eventoRoutes';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/evento')
  .then(() => console.log(' Conectado ao MongoDB com sucesso!'))
  .catch((error) => console.error(' Erro ao conectar ao MongoDB:', error));

app.use('/api', eventoRoutes);


app.listen(PORT, () => {
  console.log(` Servidor rodando em http://localhost:${PORT}`);
});
