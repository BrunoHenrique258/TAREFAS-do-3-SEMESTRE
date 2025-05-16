import { Request, Response, NextFunction } from 'express';

export const validatePetData = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { name, species, age, owner } = req.body;

  try {
    if (!name || !species || !age || !owner) {
      // Aqui você não precisa de "return", basta enviar a resposta
      res.status(400).json({ error: 'Dados obrigatórios não fornecidos' });
      return;  // Após enviar a resposta, use "return" para garantir que a execução pare aqui
    }

    // Se tudo estiver correto, passa para o próximo middleware ou controlador
    next();
  } catch (error) {
    // Se houver algum erro, passe para o próximo middleware de erro
    next(error);
  }
};

// Função fictícia de verificação assíncrona (exemplo)
async function checkIfOwnerExists(owner: string): Promise<boolean> {
  return owner === 'JohnDoe';  // Apenas um exemplo simples
}
