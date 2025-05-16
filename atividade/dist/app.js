"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pet_Routes_1 = __importDefault(require("../src/routes/pet.Routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware para parsear JSON no corpo da requisição
app.use('/api', pet_Routes_1.default); // Usando as rotas definidas para pets
exports.default = app;
