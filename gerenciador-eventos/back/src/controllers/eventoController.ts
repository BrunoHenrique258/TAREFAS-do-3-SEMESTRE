import { Request, Response } from 'express';
import mongoose from 'mongoose';


const eventoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  data: { type: Date, required: true },
  local: { type: String, required: true },
  valor: { type: Number, required: true }
});

const Evento = mongoose.model('Evento', eventoSchema);


export const criarEvento = async (req: Request, res: Response) => {
  try {
    const novoEvento = new Evento(req.body);
    const eventoSalvo = await novoEvento.save();
    res.status(201).json({ mensagem: 'Evento criado com sucesso!', evento: eventoSalvo });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao criar evento', detalhes: error });
  }
};


export const listarEventos = async (req: Request, res: Response) => {
  try {
    const { titulo } = req.query;
    const eventos = titulo
      ? await Evento.find({ titulo: new RegExp(String(titulo), 'i') })
      : await Evento.find();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar eventos' });
  }
};


export const atualizarEvento = async (req: Request, res: Response) => {
  try {
    const eventoAtualizado = await Evento.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!eventoAtualizado) return res.status(404).json({ erro: 'Evento não encontrado' });
    res.json({ mensagem: 'Evento atualizado com sucesso', evento: eventoAtualizado });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao atualizar evento', detalhes: error });
  }
};


export const excluirEvento = async (req: Request, res: Response) => {
  try {
    const eventoRemovido = await Evento.findByIdAndDelete(req.params.id);
    if (!eventoRemovido) return res.status(404).json({ erro: 'Evento não encontrado' });
    res.json({ mensagem: 'Evento removido com sucesso' });
  } catch (error) {
    res.status(400).json({ erro: 'Erro ao excluir evento', detalhes: error });
  }
};
