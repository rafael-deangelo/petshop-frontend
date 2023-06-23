import { useNavigate } from "react-router-dom";
import Card from "../Card";

export default function HorizontalList({ nome, lista }) {
  const navigate = useNavigate();
  if (lista.length === 0) {
    return null;
  }
  return (
    <div className="w-100">
      <h3 className="text-center">{nome}</h3>
      <ul className="list-group list-group-horizontal position-relative overflow-auto w-100">
        {lista.map((li) => (
          <li key={li._id} className="list-group-item">
            <Card
              key={li._id}
              id={li.codigo}
              onClick={() => navigate(`detalhes`)}
              imagem={li.imagem}
              nome={li.nome}
              nomecategoria={li.nomecategoria}
              preco={li.preco}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
