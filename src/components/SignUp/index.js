import React, { useContext } from "react";
import { ClienteContext } from "../../App";
import "./signUp.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../../services/index";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  // MDBBtnGroup,
} from "mdb-react-ui-kit";

function SignUp() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cpf, setCpf] = useState("");
  const [nomeCartao, setNomeCartao] = useState("");
  const [numeroCartao, setNumeroCartao] = useState("");
  const [cvc, setCvc] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [imagem, setImagem] = useState(null);
  const hiddenFileInput = React.useRef(null);
  const { state } = useLocation();
  const [cliente, setCliente] = useContext(ClienteContext);
  const [alterar, setAlterar] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (state) {
        setNome(state.nomeCompleto);
        setTelefone(state.telefone);
        setEndereco(state.endereco);
        setCpf(state.cpf);
        setNomeCartao(state.dadosCartao.nomeCartao);
        setNumeroCartao(state.dadosCartao.numeroCartao);
        setCvc(state.dadosCartao.cvc);
        setEmail(state.email);
        setAlterar(true);
      } else {
        setCliente(null);
        setAlterar(false);
      }
    };
    load();
  }, [state]);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var formData = null;
    if (alterar) {
      formData = {
        nomeCompleto: nome,
        telefone: telefone,
        endereco: endereco,
        cpf: cpf,
        email: email,
        senha: senha,
        dadosCartao: {
          nomeCartao: nomeCartao,
          numeroCartao: numeroCartao,
          cvc: cvc,
        },
      };
    } else {
      formData = new FormData();
      formData.append("nomeCompleto", nome);
      formData.append("telefone", telefone);
      formData.append("endereco", endereco);
      formData.append("cpf", cpf);
      formData.append("dadosCartao.nomeCartao", nomeCartao);
      formData.append("dadosCartao.numeroCartao", numeroCartao);
      formData.append("dadosCartao.cvc", cvc);
      formData.append("email", email);
      formData.append("senha", senha);
      formData.append("imagem", imagem);
    }

    console.log("formdata", formData);

    api({
      method: alterar ? "PUT" : "POST",
      url: alterar ? `/cliente/${cliente.codigo}` : "/cliente/criaCliente",
      data: formData,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error(err.response.data); // Objeto de erro vindo do axios
        alert(" Ocorreu um erro! " + err.response.data.error);
      })
      .finally(() => {
        if (!alterar) {
          setNome("");
          setTelefone("");
          setEndereco("");
          setCpf("");
          setNomeCartao("");
          setNumeroCartao("");
          setCvc("");
          setEmail("");
          setSenha("");
        } else {
          api.get(`/cliente/${cliente.codigo}`).then((response) => {
            if (response.data) {
              var novocliente = response.data;
              novocliente.token = cliente.token;
              setCliente(novocliente);
            }
          });
        }
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="text-center justify-content-center col-md-5 mt-5">
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            Cadastre-se
            <br />
            <span className="text-primary">Agora mesmo!</span>
          </h1>

          <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
            - Ambiente Seguro
            <br></br>- A senha deve conter letras e números e ter no mínimo 6
            caracteres.
            <br></br>- Você também pode usar letras maiúsculas e minúsculas e
            caracteres especiais.
            <br></br>
            (*, %, $, @).
          </p>
        </div>

        <div className="row col-md-7">
          <MDBCard className="my-5">
            <MDBCardBody className="p-5">
              <MDBRow>
                <MDBCol col="6">
                  <MDBInput
                    wrapperClass="mb-4"
                    placeholder="Nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </MDBCol>
              </MDBRow>
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Telefone"
                type="number"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Endereço"
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="CPF"
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Nome no cartão"
                type="text"
                value={nomeCartao}
                onChange={(e) => setNomeCartao(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Número do cartão"
                type="text"
                maxLength={20}
                value={numeroCartao}
                onChange={(e) => setNumeroCartao(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                placeholder="CVV"
                type="password"
                maxLength={3}
                style={{ maxWidth: "120px" }}
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
              />
              <div className="row mb-4">
                <div className="col-6">
                  <input
                    className="form-control"
                    placeholder="E-mail"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <input
                    className="form-control"
                    placeholder="Senha"
                    type="text"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-4">
                <MDBCol
                  md="6"
                  className="justify-content-center align-items-center text-center"
                ></MDBCol>
                <div className="mb-4">
                  <button className="btn btn-primary" onClick={handleClick}>
                    Selecione Foto Perfil
                  </button>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    ref={hiddenFileInput}
                    style={{ display: "none" }}
                    value={""}
                    onChange={(e) => setImagem(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-lg btn-success"
                  size="md"
                  onClick={handleSubmit}
                >
                  {alterar ? "Atualizar" : "Cadastrar"}
                </button>
              </div>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
