import React, { useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ClienteContext } from "../../App";

export default function Header() {
  const location = useLocation();
  const [cliente, setCliente] = useContext(ClienteContext);
  const navigate = useNavigate();

  const showButtons = location.pathname !== "/cliente";

  useEffect(() => {
    const verificaUserLogado = () => {
      let clocal = JSON.parse(localStorage.getItem("cliente-data"));
      console.log("clocal:", clocal);
      if (clocal) setCliente(clocal);
    };
    verificaUserLogado();
  }, [cliente.token]);

  const logout = () => {
    localStorage.setItem("cliente-data", null);
    setCliente({});
    navigate("/");
  };

  return (
    <header className="text-bg-dark">
      <div className="container d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <ul className="nav col-md-3">
          <li>
            <Link to="/" className="nav-link px-2 text-secondary">
              <img
                src="https://static.wixstatic.com/media/c0e8b5_2f554bc1b3aa4f6ca7c931b36e07cd20~mv2.png/v1/crop/x_0,y_0,w_1292,h_824/fill/w_560,h_358,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logo%20Sem%20Fundo.png"
                alt="Logo PETSHOP UP"
                style={{ width: "40%" }}
              />
              PETSHOP UP
            </Link>
          </li>
        </ul>

        <div className="nav d-flex col-md-9 justify-content-end mb-2">
          {cliente.token ? (
            <button className="btn btn-outline-light me-2" onClick={logout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn btn-outline-light me-2">
              Login
            </Link>
          )}
          {cliente.token && (
            <Link to="/pedido" className="btn btn-danger me-2">
              Carrinho
            </Link>
          )}
          {showButtons && cliente.token === undefined && (
            <Link to="/cliente" className="btn btn-primary">
              Cadastrar
            </Link>
          )}
          {showButtons && cliente.token !== undefined && (
            <Link to="/cliente" state={cliente} className="btn btn-primary">
              Meu Perfil
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

// import { Link, useLocation } from "react-router-dom";

// export default function Header() {
//   const location = useLocation();
//   return (
//     <>
//       <header className="p-3 text-bg-dark">
//         <>
//           <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
//             <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
//               <li>
//                 <Link className="nav-link px-2 text-secondary">
//                   <img
//                     width="15%"
//                     src="https://static.wixstatic.com/media/c0e8b5_2f554bc1b3aa4f6ca7c931b36e07cd20~mv2.png/v1/crop/x_0,y_0,w_1292,h_824/fill/w_560,h_358,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Logo%20Sem%20Fundo.png"
//                     alt="logo"
//                   />
//                   PETSHOP UP
//                 </Link>
//               </li>
//             </ul>

//             <div className="text-end">
//               <button type="button" className="btn btn-outline-light me-2">
//                 Login
//               </button>
//               <button type="button" className="btn btn-danger me-2">
//                 Carrinho
//               </button>
//               <div className="col-md-3 text-end">
//                 {location.pathname !== "/login" && (
//                   <Link to="/login" className="btn btn-primary">
//                     Cadastrar
//                   </Link>
//                 )}
//               </div>
//               <button type="button" className="btn btn-warning">
//                 Sign-up
//               </button>
//             </div>
//           </div>
//         </>
//       </header>
//     </>
//   );
// }

/* <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
<Link href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
    <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
</Link>

<ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
    <li> <Link className="nav-link" to='/'>Home</Link> </li>
    <li> <Link className="nav-link" to='/'>Carrinho</Link> </li>
    <li> <Link className="nav-link" to='/'>Cadastrar</Link> </li>                  
</ul>

<div className="col-md-3 text-end">
    <button type="button" className="btn btn-primary">Login</button>
</div>
</header> */
