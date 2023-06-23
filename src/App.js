import { BrowserRouter as Router } from "react-router-dom";
import React, { createContext, useState } from "react";

import Header from "./components/Header/index";
import Footer from "./components/Footer/index";
import RoutesConfig from "./RoutesConfig";
export const ClienteContext = createContext();
export const CarrinhoContext = createContext();

export default function App() {
  const [cliente, setCliente] = useState({});
  const [carrinho, setCarrinho] = useState([]);

  return (
    <ClienteContext.Provider value={[cliente, setCliente]}>
      <CarrinhoContext.Provider value={[carrinho, setCarrinho]}>
        <Router>
          <Header />
          <RoutesConfig />
          <Footer />
        </Router>
      </CarrinhoContext.Provider>
    </ClienteContext.Provider>
  );
}
