import { useEffect, useState } from 'react';
import api from '../services/api';

interface Reserva {
  _id: string;
  nomeCliente: string;
  numeroMesa: number;
  dataHora: string;
  status: string;
  contato: string;
}

const Reservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [novaReserva, setNovaReserva] = useState<Omit<Reserva, '_id'>>({
    nomeCliente: '',
    numeroMesa: 0,
    dataHora: '',
    status: 'reservado',
    contato: '',
  });

  const buscarReservas = async () => {
    const res = await api.get('/');
    setReservas(res.data);
  };

  const criarReserva = async () => {
    await api.post('/', novaReserva);
    buscarReservas();
  };

  useEffect(() => {
    buscarReservas();
  }, []);

  return (
    <div>
      <h1>Reservas</h1>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva._id}>
            {reserva.nomeCliente} - Mesa {reserva.numeroMesa} - {new Date(reserva.dataHora).toLocaleString()}
          </li>
        ))}
      </ul>
      <h2>Nova Reserva</h2>
      <input placeholder="Nome" onChange={(e) => setNovaReserva({ ...novaReserva, nomeCliente: e.target.value })} />
      <input placeholder="Mesa" type="number" onChange={(e) => setNovaReserva({ ...novaReserva, numeroMesa: +e.target.value })} />
      <input type="datetime-local" onChange={(e) => setNovaReserva({ ...novaReserva, dataHora: e.target.value })} />
      <input placeholder="Contato" onChange={(e) => setNovaReserva({ ...novaReserva, contato: e.target.value })} />
      <button onClick={criarReserva}>Reservar</button>
    </div>
  );
};

export default Reservas;
