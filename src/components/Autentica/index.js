import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/index";
import  {ClienteContext } from "../../App";
import "./autentica.css";

export default function Autentica() {
  const [ cliente, setCliente ] = useContext(ClienteContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const bodyParam = {
      email: email,
      senha: senha,
    };

    api
      .post("/login/login", bodyParam)
      .then((response) => {
        console.log(response.data);
        alert(" Token gerado para o usuario " + response.data.nomeCompleto);
        localStorage.setItem("cliente-data", JSON.stringify(response.data));
        setCliente(response.data);

        navigate("/");
      })
      .catch((err) => {
        console.error(err.response.data); // Objeto de erro vindo do axios
        alert(" Ocorreu um erro! " + err.response.data.error);
      })
      .finally(() => {
        setEmail("");
        setSenha("");
      });
  }

  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-2 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Entre com seu login e senha
                    </p>

                    <form onSubmit={handleSubmit}>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="email"
                          id="typeEmailX"
                          placeholder="e-mail"
                          className="form-control form-control-lg"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="typePasswordX"
                          placeholder="Senha"
                          className="form-control form-control-lg"
                          onChange={(e) => setSenha(e.target.value)}
                        />
                      </div>

                      <p className="small mb-4 pb-lg-2">
                        <a className="text-white-50" href="#!">
                          Esqueceu sua senha?
                        </a>
                      </p>

                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Login
                      </button>
                    </form>
                  </div>

                  <div>
                    <p className="mb-0">
                      Não tem uma conta?{" "}
                      <Link to="/cliente" className="text-white-50 fw-bold">
                        Cadastre-se
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
