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
          <li key={li.id} className="list-group-item">
            <Card
              id={li.id}
              onClick={() => navigate(`/pedido/${li.id}`)}
              imagem={li.imagem}
              nome={li.nome}
              preco={li.preco}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
