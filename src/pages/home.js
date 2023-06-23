import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import Loading from "../components/Loading";
import Title from "../components/Title";
import api from "../services";
import HorizontalList from "../components/HorizontalList";

export default function Home() {
  const [categorias, setCategorias] = useState([]);
  const [filterCategorias, setFilterCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalprodutos, setTotalProdutos] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resProd = await api.get("/produto/produtos");
        const resCat = await api.get("/categoria/categorias");
        if (resProd.data) {
          resProd.data.forEach((p) => {
            let nomecategoria = resCat.data.find(
              (x) => x._id === p.categoria
            ).nome;
            if (nomecategoria) p.nomecategoria = nomecategoria;
          });
        }
        const fullCat = resCat.data.map((cat) => {
          return {
            ...cat,
            produtos: resProd.data.filter((prod) => prod.categoria === cat._id),
          };
        });
        console.log(fullCat);
        setCategorias(fullCat);
        setFilterCategorias(fullCat);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError("Não foi possível buscar os produtos");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const calculaProdutos = async () => {
      let total = 0;
      filterCategorias.forEach((c) => {
        total += c.produtos.length;
      });
      setTotalProdutos(total);
    }
    calculaProdutos();
  },[filterCategorias])

  const handleFilterSearchChange = (searchValue) => {
    if (searchValue) {
      const filteredCategories = categorias.map((cat) => {
        return {
          ...cat,
          produtos: cat.produtos.filter((produtos) =>
            produtos.nome.toLowerCase().includes(searchValue.toLowerCase())
          ),
        };
      });
      setFilterCategorias(filteredCategories);
    } else {
      setFilterCategorias(categorias);
    }
  };

  const handleFilterSelectChange = (selectValue) => {
    switch (selectValue) {
      case "preco-menor-maior":
        setCategorias(
          categorias.map((cat) => {
            return {
              ...cat,
              produtos: cat.produtos.sort((a, b) => {
                if (a.preco > b.preco) return 1;
                else return -1;
              }),
            };
          })
        );
        setFilterCategorias(
          filterCategorias.map((cat) => {
            return {
              ...cat,
              produtos: cat.produtos.sort((a, b) => {
                if (a.preco > b.preco) return 1;
                else return -1;
              }),
            };
          })
        );
        break;
      case "preco-maior-menor":
        setCategorias(
          categorias.map((cat) => {
            return {
              ...cat,
              produtos: cat.produtos.sort((a, b) => {
                if (a.preco < b.preco) return 1;
                else return -1;
              }),
            };
          })
        );
        setFilterCategorias(
          filterCategorias.map((cat) => {
            return {
              ...cat,
              produtos: cat.produtos.sort((a, b) => {
                if (a.preco < b.preco) return 1;
                else return -1;
              }),
            };
          })
        );
        break;
      case "nome":
        setCategorias(
          categorias.map((cat) => {
            return {
              ...cat,
              produtos: cat.produtos.sort((a, b) => {
                if (a.nome > b.nome) return 1;
                else return -1;
              }),
            };
          })
        );
        setFilterCategorias(
          filterCategorias.map((cat) => {
            return {
              ...cat,
              produtos: cat.produtos.sort((a, b) => {
                if (a.nome > b.nome) return 1;
                else return -1;
              }),
            };
          })
        );
        break;

      default:
        break;
    }
  };

  return (
    <div className="d-flex row justify-content-center w-100">
      <Title
        title="Catálogo de Produtos"
        text="Atualmente temos disponíveis os produtos listados abaixo."
      />
      <Filter
        onSeachChange={handleFilterSearchChange}
        onSelectChange={handleFilterSelectChange}
      />
      {loading && <Loading />}
      {error && <p className="lead">{error}</p>}
      {filterCategorias.length > 0 &&
        filterCategorias.map((cat) => (
          <HorizontalList key={cat._id} lista={cat.produtos} nome={cat.nome} />
        ))}
      {totalprodutos === 0 && (
        <div style={{ textAlign: "center" }}>
          <p className="lead">Não foram encontrados resultados</p>
        </div>
      )}
    </div>
  );
}
