import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Login from "./pages/login";
import Cliente from "./pages/cliente";
import Pedido from "./pages/pedido";
import Detalhes from "./pages/detalhes";

export default function RoutesConfig () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detalhes" element={<Detalhes />} />
      <Route path="login" element={<Login />} />
      <Route path="pedido" element={<Pedido />} />
      <Route path="cliente" element={<Cliente />} />
      <Route path="*" element={<h1>Página Não Encontrada!</h1>} />
    </Routes>
  );
}
