import React from "react";
import styled from "styled-components";
import axios from "axios";

interface Reserva {
  _id: string;
  nomeCliente: string;
  numeroMesa: number;
  dataHora: string;
  status: string;
  contato: string;
}

interface Props {
  reservas: Reserva[];
  onEdit: (reserva: Reserva) => void;
  onDelete: () => void;
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;

  th, td {
    border: 1px solid #ddd;
    padding: 0.5rem;
    text-align: center;
  }

  th {
    background-color: #2563eb;
    color: white;
  }
`;

const Button = styled.button`
  margin: 0 0.3rem;
  padding: 0.3rem 0.7rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  color: white;
`;

const EditButton = styled(Button)`
  background-color: #3b82f6;
`;

const DeleteButton = styled(Button)`
  background-color: #ef4444;
`;

const ReservaList: React.FC<Props> = ({ reservas, onEdit, onDelete }) => {
  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta reserva?")) {
      try {
        await axios.delete(`http://localhost:3000/api/reservas/${id}`);
        alert("Reserva excluída com sucesso!");
        onDelete();
      } catch {
        alert("Erro ao excluir reserva");
      }
    }
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Mesa</th>
          <th>Data e Hora</th>
          <th>Contato</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {reservas.map(r => (
          <tr key={r._id}>
            <td>{r.nomeCliente}</td>
            <td>{r.numeroMesa}</td>
            <td>{new Date(r.dataHora).toLocaleString()}</td>
            <td>{r.contato}</td>
            <td>{r.status}</td>
            <td>
              <EditButton onClick={() => onEdit(r)}>Editar</EditButton>
              <DeleteButton onClick={() => handleDelete(r._id)}>Excluir</DeleteButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReservaList;
