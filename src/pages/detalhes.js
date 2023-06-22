import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services";
import Title from "../components/Title";
import Loading from "../components/Loading";
import Comments from '../components/Comments';
import React from "react";
import { useNavigate } from "react-router-dom";



export default function Detalhes() {
    const navigate = useNavigate();
    const { produtoId } = useParams();
    const [produto, setProduto] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchProdutooById = async () => {
        try {
          setLoading(true);
          const res = await api.get(`/produto/produtos/${produtoId}`);
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

    return (
        <div>
            <Title title="Produto" text="Informações do produto"/>
            {loading && <Loading />}
      {error && <p className="lead">{error}</p>}
      {produto && (
        <div className="row flex-lg-row align-items-center py-2">
          <div className="col-6">
            <img
              src={"https://cdn.vectorstock.com/i/preview-1x/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg"}
              alt="Card poster cap"
              className="d-block mx-lg-auto img-fluid"
              loading="lazy"
            />
          </div>
          <div className="col-6">
            <h1 className="display-6 fw-bold lh-1 mb-3">{produto.nome}</h1>
            <p className="lead">{produto.categoria}</p>
            <p className="lead">{produto.descricao}</p>
            <p className="lead">{produto.preco}</p>
            <p className="lead">{produto.notatotal}</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button
 
          onClick={() => navigate(`/pedido`)}
          className="btn btn-primary"
        >
          Adicionar ao Carrinho
        </button>
            </div>
          </div>
        </div>
      )}
      <Comments />
    </div>

    )
}