import React from "react";
import { Link } from "react-router-dom";

function Card({ imagem, nome, preco, id, nomecategoria }) {

  const imageStyle = {
    width: "300px",
    height: "300px", // Ajuste esse valor para a altura desejada
    objectFit: "contain"
  };

  return (
    <div className="card m-1 p-0 " style={{ width: "18rem" }}>
      {imagem ? (
        <img
          src={`data:image/png;base64,${btoa(new Uint8Array(imagem.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`}
          alt=""
          style={imageStyle}
        />
      ) : (
        <img
          className="card-img-top"
          src={
            imagem ||
            "https://cdn.vectorstock.com/i/preview-1x/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg"
          }
          alt="Card poster cap"
          style={imageStyle}
        />
      )}
      <div className="card-body d-flex flex-column justify-content-center align-items-center">
        <h6 className="card-title text-center">{nome}</h6>
        <p className="card-text text-center">{preco}</p>
        <Link
          to={`/detalhes/${id}`}
          state={{ categoria: nomecategoria }}
          className="btn btn-primary"
        >
          Detalhes
        </Link>
      </div>
    </div>
  );
}

export default Card;
