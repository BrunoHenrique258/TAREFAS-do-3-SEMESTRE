"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePetData = void 0;
const validatePetData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, species, age, owner } = req.body;
    try {
        if (!name || !species || !age || !owner) {
            // Aqui você não precisa de "return", basta enviar a resposta
            res.status(400).json({ error: 'Dados obrigatórios não fornecidos' });
            return; // Após enviar a resposta, use "return" para garantir que a execução pare aqui
        }
        // Se tudo estiver correto, passa para o próximo middleware ou controlador
        next();
    }
    catch (error) {
        // Se houver algum erro, passe para o próximo middleware de erro
        next(error);
    }
});
exports.validatePetData = validatePetData;
// Função fictícia de verificação assíncrona (exemplo)
function checkIfOwnerExists(owner) {
    return __awaiter(this, void 0, void 0, function* () {
        return owner === 'JohnDoe'; // Apenas um exemplo simples
    });
}
