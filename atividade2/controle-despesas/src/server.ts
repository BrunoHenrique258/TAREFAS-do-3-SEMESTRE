import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import expenseRoutes from "./routes/expenseRoutes";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/expenses", expenseRoutes);

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "../public")));

mongoose
  .connect("mongodb://localhost:27017/controle-despesas")
  .then(() => {
    console.log("Conectado ao MongoDB");
    app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
  })
  .catch((err) => console.error("Erro ao conectar ao MongoDB", err));
