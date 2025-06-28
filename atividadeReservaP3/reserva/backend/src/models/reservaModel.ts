import mongoose, { Schema, Document } from "mongoose";

export interface IReserva extends Document {
  nomeCliente: string;
  numeroMesa: number;
  dataHora: Date;
  status: "reservado" | "ocupado" | "disponível";
  contato: string;
}

const ReservaSchema: Schema = new Schema({
  nomeCliente: { type: String, required: true },
  numeroMesa: { type: Number, required: true, min: 1 },
  dataHora: { type: Date, required: true },
  status: {
    type: String,
    enum: ["reservado", "ocupado", "disponível"],
    default: "reservado",
  },
  contato: { type: String, required: true },
});

export default mongoose.model<IReserva>("Reserva", ReservaSchema);
