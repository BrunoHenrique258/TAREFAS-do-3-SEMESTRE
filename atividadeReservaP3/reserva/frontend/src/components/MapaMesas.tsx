import React from "react";

interface Reserva {
  _id?: string;
  nomeCliente: string;
  numeroMesa: number;
  dataHora: string;
  contato: string;
  status?: string;
}

interface MapaMesasProps {
  reservas: Reserva[];
  onMesaClick: (numeroMesa: number) => void;
}

const MapaMesas: React.FC<MapaMesasProps> = ({ reservas, onMesaClick }) => {

  return (
    <div>
      {/* Exemplo simples: renderizar 12 mesas */}
      {[...Array(12)].map((_, i) => {
        const numeroMesa = i + 1;
        const reserva = reservas.find(r => r.numeroMesa === numeroMesa);
        const status = reserva ? reserva.status || "reservado" : "disponível";

        return (
          <button
            key={numeroMesa}
            style={{
              margin: 5,
              padding: 20,
              backgroundColor:
                status === "disponível"
                  ? "lightgreen"
                  : status === "ocupado"
                  ? "lightcoral"
                  : "lightgray",
              cursor: status === "disponível" ? "pointer" : "not-allowed",
            }}
            disabled={status !== "disponível"}
            onClick={() => onMesaClick(numeroMesa)}
          >
            Mesa {numeroMesa}
          </button>
        );
      })}
    </div>
  );
};

export default MapaMesas;
