import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Footer() {
  return (
    <div>
      <footer class="bg-dark text-center text-white">
        <div class="container p-4 pb-0">
          <section class="mb-4">
            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fab fa-twitter"></i>
            </a>
            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fab fa-google"></i>
            </a>
            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              class="btn btn-outline-light btn-floating m-1"
              href="#!"
              role="button"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
          </section>
        </div>

        <div class="text-center p-3">
          © 2023 Copyright - Todos os direitos reservados
        </div>
      </footer>
    </div>
  );
}

// import "./footer.css";

// export default function Footer() {
//     return (
//         <div className="container">
//             <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
//                 <div className="col-md-4 d-flex align-items-center">
//                     <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
//                         <svg className="bi" width="30" height="24"></svg>
//                     </a>
//                     <span className="text-muted">© Dev Web Avançado</span>
//                 </div>

//                 <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
//                     <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"></svg></a></li>
//                     <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"></svg></a></li>
//                     <li className="ms-3"><a className="text-muted" href="#"><svg className="bi" width="24" height="24"></svg></a></li>
//                 </ul>
//             </footer>
//         </div>
//     )
// }
