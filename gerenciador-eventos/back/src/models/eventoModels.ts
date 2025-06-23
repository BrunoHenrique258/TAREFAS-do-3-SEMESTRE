import mongoose, { Schema, Document } from 'mongoose';

interface IEvento extends Document {
  titulo: string;
  descricao: string;
  data: Date;
  local: string;
  valor: number;
}

const eventoSchema: Schema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  descricao: {
    type: String,
    required: false,
  },
  data: {
    type: Date,
    required: true,
  },
  local: {
    type: String,
    required: true,
  },
  valor: {
    type: Number,
    required: true,
  }
}, { timestamps: true });

const Evento = mongoose.model<IEvento>('Evento', eventoSchema);

export default Evento;
