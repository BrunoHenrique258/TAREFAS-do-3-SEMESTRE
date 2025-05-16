import { Schema, model } from 'mongoose';

interface IPet {
  name: string;
  species: string;
  age: number;
  owner: string;
  ownerContact?: string;
}

const petSchema = new Schema<IPet>({
  name: { type: String, required: true },
  species: { type: String, required: true },
  age: { type: Number, required: true },
  owner: { type: String, required: true },
  ownerContact: { type: String, required: false },
});

const Pet = model<IPet>('Pet', petSchema);

export default Pet;
