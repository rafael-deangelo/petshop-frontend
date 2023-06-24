import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { CarrinhoContext } from "../App";
import { ClienteContext } from "../App";
import api from "../services";
import Title from "../components/Title";
import Loading from "../components/Loading";
import { useNavigate, useLocation } from "react-router-dom";

export default function Detalhes() {
  const [carrinho, setCarrinho] = useContext(CarrinhoContext);
  const [cliente, setCliente] = useContext(ClienteContext);
  const navigate = useNavigate();
  const { produtoId } = useParams();
  const { state } = useLocation();
  const [produto, setProduto] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  const imageStyle = {
    width: "300px",
    height: "400px", // Ajuste esse valor para a altura desejada
    objectFit: "contain"
  };

  useEffect(() => {
    const fetchProdutooById = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/produto/buscarproduto/${produtoId}`);
        setProduto(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        setError("Não foi possível encontrar os detalhes deste produto!");
        setLoading(false);
      }
    };
    fetchProdutooById();
  }, [produtoId]);

  const adicionarCarrinho = () => {
    var pr = produto;
    pr.quantidade = quantidade;
    setCarrinho([...carrinho, pr]);
    console.log(carrinho);
    if (cliente.token) {
      navigate("/pedido");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Title title="Produto" text="Informações do produto" />
      {loading && <Loading />}
      {error && <p className="lead">{error}</p>}
      {produto && (
        <>
          <div className="row flex-lg-row align-items-center py-2">
            <div className="col-6">
              {produto.imagem ? (
                <img
                  src={`data:image/png;base64,${btoa(
                    new Uint8Array(produto.imagem.data).reduce(
                      (data, byte) => data + String.fromCharCode(byte),
                      ""
                    )
                  )}`}
                  alt="Card poster cap"
                  className="d-block mx-lg-auto"
                  loading="lazy"
                  style={imageStyle}
                  
                />
              ) : (
                <img
                  src={
                    produto.imagem ||
                    "https://cdn.vectorstock.com/i/preview-1x/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg"
                  }
                  alt="Card poster cap"
                  className="d-block mx-lg-auto"
                  style={imageStyle}
                  loading="lazy"
                />
              )}
            </div>
            <div className="col-6">
              <h1 className="display-6 fw-bold lh-1 mb-3">{produto.nome}</h1>
              <p className="lead">{state.categoria}</p>
              <p className="lead">{produto.descricao}</p>
              <p className="lead">{produto.preco}</p>
              <p className="lead">{produto.notatotal}</p>
              <div className="form-outline col-3 mb-3">
                <label className="form-label">Quantidade</label>
                <input
                  type="number"
                  className="form-control"
                  value={quantidade}
                  onChange={(e) => setQuantidade(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                <button onClick={adicionarCarrinho} className="btn btn-primary">
                  Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
          <div className="container mb-2">
            <div className="card">
              <h5 className="card-header">Comentários</h5>
              <div className="card-body d-flex">
                <div className="col-md-9">
                  <h5 className="card-title">Sobre o produto: </h5>
                  <p className="card-text">{produto.comentario}</p>
                </div>
                <div className="col-md-3 text-center">
                  <button
                    type="button"
                    className="btn btn-primary btn-sm btn-block"
                  >
                    Comente Agora!
                  </button>
                  <div className="stars">
                    <span className="glyphicon glyphicon-star"></span>
                    <span className="glyphicon glyphicon-star"></span>
                    <span className="glyphicon glyphicon-star"></span>
                    <span className="glyphicon glyphicon-star"></span>
                    <span className="glyphicon glyphicon-star-empty"></span>
                  </div>
                  <p>Nota {produto.notaTotal} <small> / </small> 5
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
