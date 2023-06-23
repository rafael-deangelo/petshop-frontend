import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { CarrinhoContext, ClienteContext } from "../../App";
import api from "../../services";

export default function Checkout() {
  const [carrinho, setCarrinho] = useContext(CarrinhoContext);
  const [cliente, setCliente] = useContext(ClienteContext);
  const [dados, setDados] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      let total = carrinho.reduce(
        (acc, o) => acc + parseFloat(o.quantidade * o.preco),
        0
      );
      setDados({ ...dados, total: total });
    };
    load();
  }, [carrinho]);

  function handleSubmit(event) {
    event.preventDefault();

    if(carrinho.length === 0){
      alert(`Carrinho sem nenhum produto, adicione para confirmar.`);
      return;
    }

    var pedido = {
      preco: dados.total,
      status: "pedido realizado",
      cliente: cliente.codigo,
      data: new Date().toISOString(),
      produtos: [],
    };
    carrinho.forEach((p) => {
      pedido.produtos.push({ produto: p.codigo, quantidade: p.quantidade });
    });
    console.log("pedido", pedido);
    api
      .post("/pedido/criarPedido", pedido, {
        headers: {
          Authorization: `Bearer ${cliente.token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data) {
          console.log(response.data);
          alert(
            `Compra efetuada com sucesso para o cliente codigo: ${response.data.codigo}`
          );
          setCarrinho([]);
          navigate("/");
        }
      });
  }

  return (
    <>
      <div className="container text-center">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {carrinho.map((item, i) => (
              <div className="col" key={i}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{item.nome} </h5>
                    <p>Quantidade: {item.quantidade}</p>
                    <p>Preço: {item.preco}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col">
              <br />
              <p className="lead">Valor Total do Pedido: R$ {dados.total}</p>
            </div>
          </div>
          <button type="submit" className="btn btn-primary mb-5">
            Finalizar Pedido
          </button>
        </form>
      </div>
      <div className="container">
        <div className="row mb-3">
          <div className="col-6">
            <div className="card" style={{ minHeight: 165 }}>
              <div className="card-body">
                <h5 className="card-title">Dados Entrega</h5>
                <p className="card-text m-0">Cliente: {cliente.nomeCompleto}</p>
                <p className="card-text m-0">Endereço: {cliente.endereco}</p>
                <p className="card-text m-0">Telefone: {cliente.telefone}</p>
                <p className="card-text m-0">CPF: {cliente.cpf}</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card" style={{ minHeight: 165 }}>
              <div className="card-body">
                <h5 className="card-title">Dados Pagamento</h5>
                <p className="card-text m-0">
                  {" "}
                  Nome Cartão: {cliente.dadosCartao.nomeCartao}
                </p>
                <p className="card-text m-0">
                  Números Cartão: {cliente.dadosCartao.numeroCartao}
                </p>
                <p className="card-text m-0">CVV: {cliente.dadosCartao.cvc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
