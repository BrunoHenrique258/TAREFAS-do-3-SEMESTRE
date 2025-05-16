import { Request, Response } from 'express';
import Pet from '../models/pet.model';

// Criar um novo pet
export const createPet = async (req: Request, res: Response) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao criar pet' });
  }
};

// Listar todos os pets
export const getPets = async (req: Request, res: Response) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao listar pets' });
  }
};

// Buscar pet por nome ou espécie
export const searchPets = async (req: Request, res: Response) => {
  const { query } = req.query;
  try {
    const pets = await Pet.find({
      $or: [{ name: { $regex: query, $options: 'i' } }, { species: { $regex: query, $options: 'i' } }],
    });
    res.status(200).json(pets);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao buscar pet' });
  }
};

// Atualizar um pet
export const updatePet = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(400).json({ error: 'Erro ao atualizar pet' });
  }
};

// Excluir um pet
export const deletePet = async (req: Request, res: Response) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet não encontrado' });
    }
    res.status(200).json({ message: 'Pet excluído com sucesso' });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao excluir pet' });
  }
};
