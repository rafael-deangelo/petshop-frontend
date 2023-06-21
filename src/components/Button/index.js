import React from "react";

function Button({ assistido }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation(  );
        console.log("Assistir");
      }}
      className="btn btn-primary"
    >
      {assistido ? "Assistir Novamente" : "Assistir"}
    </button>
  );
}

export default Button;
