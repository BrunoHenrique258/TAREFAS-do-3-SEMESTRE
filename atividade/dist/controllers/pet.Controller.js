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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = exports.updatePet = exports.searchPets = exports.getPets = exports.createPet = void 0;
const pet_model_1 = __importDefault(require("../models/pet.model"));
// Criar um novo pet
const createPet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pet = new pet_model_1.default(req.body);
        yield pet.save();
        res.status(201).json(pet);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao criar pet' });
    }
});
exports.createPet = createPet;
// Listar todos os pets
const getPets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pets = yield pet_model_1.default.find();
        res.status(200).json(pets);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao listar pets' });
    }
});
exports.getPets = getPets;
// Buscar pet por nome ou espécie
const searchPets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query } = req.query;
    try {
        const pets = yield pet_model_1.default.find({
            $or: [{ name: { $regex: query, $options: 'i' } }, { species: { $regex: query, $options: 'i' } }],
        });
        res.status(200).json(pets);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao buscar pet' });
    }
});
exports.searchPets = searchPets;
// Atualizar um pet
const updatePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pet = yield pet_model_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pet) {
            return res.status(404).json({ error: 'Pet não encontrado' });
        }
        res.status(200).json(pet);
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao atualizar pet' });
    }
});
exports.updatePet = updatePet;
// Excluir um pet
const deletePet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pet = yield pet_model_1.default.findByIdAndDelete(req.params.id);
        if (!pet) {
            return res.status(404).json({ error: 'Pet não encontrado' });
        }
        res.status(200).json({ message: 'Pet excluído com sucesso' });
    }
    catch (error) {
        res.status(400).json({ error: 'Erro ao excluir pet' });
    }
});
exports.deletePet = deletePet;
