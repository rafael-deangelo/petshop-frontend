import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ imagem, nome, preco, id }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/detalhes/${id}`)}
      className="card m-1 p-0 "
      style={{ width: "18rem" }}
    >
      <img className="card-img-top" src={imagem || "https://cdn.vectorstock.com/i/preview-1x/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg"} alt="Card poster cap" />
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <h6 className="card-title text-center">{nome}</h6>
        <p className="card-text text-center">
          {preco}
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            console.log("Detalhes");
          }}
          className="btn btn-primary"
        >
          Detalhes
        </button>
      </div>
    </div>
  );
}

export default Card;
