import { Request, Response } from "express";
import Reserva, { IReserva } from "../models/reservaModel";

// Criar nova reserva
export const criarReserva = async (req: Request, res: Response) => {
  try {
    const { nomeCliente, numeroMesa, dataHora, contato } = req.body;

    // Validar campos básicos
    if (!nomeCliente || !numeroMesa || !dataHora || !contato) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    const data = new Date(dataHora);

    // Checar se já existe reserva para mesma mesa e horário (simples)
    const existeReserva = await Reserva.findOne({
      numeroMesa,
      dataHora: { $eq: data },
      status: { $in: ["reservado", "ocupado"] },
    });

    if (existeReserva) {
      return res.status(409).json({ error: "Mesa já reservada nesse horário" });
    }

    const reserva = new Reserva({
      nomeCliente,
      numeroMesa,
      dataHora: data,
      contato,
      status: "reservado",
    });

    await reserva.save();

    return res.status(201).json(reserva);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno" });
  }
};

// Listar reservas (opcional filtro por cliente ou mesa via query)
export const listarReservas = async (req: Request, res: Response) => {
  try {
    const { nomeCliente, numeroMesa } = req.query;

    const filtro: any = {};
    if (nomeCliente) filtro.nomeCliente = nomeCliente;
    if (numeroMesa) filtro.numeroMesa = Number(numeroMesa);

    const reservas = await Reserva.find(filtro).sort({ dataHora: 1 });

    return res.json(reservas);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno" });
  }
};

// Atualizar reserva (pode atualizar dados e status)
export const atualizarReserva = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const updateData = req.body;

    if (updateData.dataHora) updateData.dataHora = new Date(updateData.dataHora);

    // Opcional: checar disponibilidade na atualização se numeroMesa ou dataHora mudou
    if (updateData.numeroMesa || updateData.dataHora) {
      const reservaAtual = await Reserva.findById(id);
      if (!reservaAtual) return res.status(404).json({ error: "Reserva não encontrada" });

      const mesa = updateData.numeroMesa || reservaAtual.numeroMesa;
      const data = updateData.dataHora || reservaAtual.dataHora;

      const conflito = await Reserva.findOne({
        _id: { $ne: id },
        numeroMesa: mesa,
        dataHora: { $eq: data },
        status: { $in: ["reservado", "ocupado"] },
      });

      if (conflito) {
        return res.status(409).json({ error: "Mesa já reservada nesse horário" });
      }
    }

    const reservaAtualizada = await Reserva.findByIdAndUpdate(id, updateData, { new: true });

    if (!reservaAtualizada) return res.status(404).json({ error: "Reserva não encontrada" });

    return res.json(reservaAtualizada);
  } catch (error) {
    return res.status(500).json({ error: "Erro interno" });
  }
};

// Excluir reserva
export const excluirReserva = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const reserva = await Reserva.findByIdAndDelete(id);

    if (!reserva) return res.status(404).json({ error: "Reserva não encontrada" });

    return res.json({ message: "Reserva excluída com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno" });
  }
};
