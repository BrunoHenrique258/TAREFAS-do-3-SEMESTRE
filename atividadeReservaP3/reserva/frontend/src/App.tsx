import React, { useState } from "react";
import { GlobalStyle } from "./styles/globalStyles";
import MapaMesas from "./components/MapaMesas";
import ReservaForm from "./components/ReservaForm";

interface Reserva {
  _id?: string;
  nomeCliente: string;
  numeroMesa: number;
  dataHora: string;
  contato: string;
  status?: string;
}

const App: React.FC = () => {
  const [reservas] = useState<Reserva[]>([]);
  const [selecionada, setSelecionada] = useState<number | null>(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  const abrirFormulario = (numeroMesa: number) => {
    setSelecionada(numeroMesa);
    setMostrarForm(true);
  };

  const fecharFormulario = () => {
    setSelecionada(null);
    setMostrarForm(false);
  };

  const atualizarReservas = () => {
    // função para recarregar reservas da API, por exemplo
  };

  return (
    <>
      <GlobalStyle />
      <div style={{ maxWidth: 1000, margin: "2rem auto", padding: "0 1rem" }}>
        <h1>Reserva de Mesas</h1>
        <MapaMesas reservas={reservas} onMesaClick={abrirFormulario} />

        {mostrarForm && selecionada !== null && (
          <ReservaForm
            onSuccess={() => {
              atualizarReservas();
              fecharFormulario();
            }}
            onCancel={fecharFormulario}
            reservaEdit={{ nomeCliente: "", numeroMesa: selecionada, dataHora: "", contato: "" }}
          />
        )}
      </div>
    </>
  );
};

export default App;
