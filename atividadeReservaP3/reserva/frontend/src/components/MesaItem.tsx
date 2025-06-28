import React from 'react';
import styled from 'styled-components';

interface MesaProps {
  numero: number;
  status: 'disponível' | 'reservado' | 'ocupado';
  onClick?: () => void;
}

const BotaoMesa = styled.button<{ status: string }>`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  font-size: 1.2rem;
  cursor: ${({ status }) => (status === 'disponível' ? 'pointer' : 'not-allowed')};
  background-color: ${({ status }) =>
    status === 'disponível' ? '#4ade80' : status === 'reservado' ? '#fbbf24' : '#ef4444'};
  border: none;
  color: white;
  font-weight: bold;
  user-select: none;

  &:hover {
    opacity: ${({ status }) => (status === 'disponível' ? 0.8 : 1)};
  }
`;

const MesaItem: React.FC<MesaProps> = ({ numero, status, onClick }) => {
  return (
    <BotaoMesa status={status} onClick={onClick} disabled={status !== 'disponível'}>
      Mesa {numero}
    </BotaoMesa>
  );
};

export default MesaItem;
