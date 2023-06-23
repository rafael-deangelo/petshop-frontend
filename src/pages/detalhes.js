import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
import { CarrinhoContext } from "../App";
import api from "../services";
import Title from "../components/Title";
import Loading from "../components/Loading";
import { useNavigate, useLocation } from "react-router-dom";

export default function Detalhes() {
  const [carrinho, setCarrinho] = useContext(CarrinhoContext);
  const navigate = useNavigate();
  const { produtoId } = useParams();
  const { state } = useLocation();
  const [produto, setProduto] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [quantidade, setQuantidade] = useState(1);

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
          navigate("/pedido");
  }

  return (
    <div>
      <Title title="Produto" text="Informações do produto" />
      {loading && <Loading />}
      {error && <p className="lead">{error}</p>}
      {produto && (
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
                style={{ width: "350px", height: "100%" }}
              />
            ) : (
              <img
                src={
                  produto.imagem ||
                  "https://cdn.vectorstock.com/i/preview-1x/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg"
                }
                alt="Card poster cap"
                className="d-block mx-lg-auto"
                style={{ width: "350px", height: "100%" }}
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
                <input type="number" className="form-control" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
              </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              
              <button
                onClick={adicionarCarrinho}
                className="btn btn-primary"
              >
                Adicionar ao Carrinho
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
