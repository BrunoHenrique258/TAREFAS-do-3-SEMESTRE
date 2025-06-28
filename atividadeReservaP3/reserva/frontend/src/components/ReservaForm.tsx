import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

interface Reserva {
  _id?: string;
  nomeCliente: string;
  numeroMesa: number;
  dataHora: string;
  contato: string;
  status?: string;
}

interface Props {
  reservaEdit?: Reserva;
  onSuccess: () => void;
  onCancel?: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 12px;
  max-width: 420px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.12);
  animation: ${fadeIn} 0.5s ease forwards;
  margin: 1.5rem auto;
`;

const Title = styled.h3`
  margin-bottom: 1.5rem;
  color: #2563eb;
  text-align: center;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1e293b;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  margin-bottom: 1.2rem;
  border-radius: 8px;
  border: 1.8px solid #cbd5e1;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    border-color: #2563eb;
    outline: none;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const Button = styled.button<{ variant?: string }>`
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: none;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  color: white;
  background-color: ${({ variant }) =>
    variant === 'cancel' ? '#ef4444' : '#2563eb'};
  box-shadow: 0 4px 14px
    ${({ variant }) =>
      variant === 'cancel' ? 'rgba(239,68,68,0.35)' : 'rgba(37,99,235,0.35)'};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ variant }) =>
      variant === 'cancel' ? '#dc2626' : '#1d4ed8'};
  }

  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  background: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: center;
`;

const ReservaForm: React.FC<Props> = ({ reservaEdit, onSuccess, onCancel }) => {
  const [form, setForm] = useState<Reserva>({
    nomeCliente: '',
    numeroMesa: 1,
    dataHora: '',
    contato: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (reservaEdit) {
      setForm({
        nomeCliente: reservaEdit.nomeCliente,
        numeroMesa: reservaEdit.numeroMesa,
        dataHora: reservaEdit.dataHora.slice(0, 16),
        contato: reservaEdit.contato,
      });
    }
  }, [reservaEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'numeroMesa' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (reservaEdit?._id) {
        await axios.put(`http://localhost:3000/api/reservas/${reservaEdit._id}`, {
          ...form,
          dataHora: new Date(form.dataHora).toISOString(),
        });
      } else {
        await axios.post('http://localhost:3000/api/reservas', {
          ...form,
          dataHora: new Date(form.dataHora).toISOString(),
        });
      }
      onSuccess();
      onCancel?.();
      setForm({
        nomeCliente: '',
        numeroMesa: 1,
        dataHora: '',
        contato: '',
      });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao salvar reserva');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Title>{reservaEdit ? 'Editar Reserva' : 'Nova Reserva'}</Title>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Label htmlFor="nomeCliente">Nome do Cliente</Label>
      <Input
        id="nomeCliente"
        name="nomeCliente"
        value={form.nomeCliente}
        onChange={handleChange}
        required
        placeholder="Digite o nome completo"
      />

      <Label htmlFor="numeroMesa">Número da Mesa</Label>
      <Input
        id="numeroMesa"
        name="numeroMesa"
        type="number"
        min={1}
        max={12}
        value={form.numeroMesa}
        onChange={handleChange}
        required
      />

      <Label htmlFor="dataHora">Data e Hora</Label>
      <Input
        id="dataHora"
        name="dataHora"
        type="datetime-local"
        value={form.dataHora}
        onChange={handleChange}
        required
      />

      <Label htmlFor="contato">Contato</Label>
      <Input
        id="contato"
        name="contato"
        value={form.contato}
        onChange={handleChange}
        required
        placeholder="Email ou telefone"
      />

      <ButtonGroup>
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
        )}
      </ButtonGroup>
    </Form>
  );
};

export default ReservaForm;
