import React, { useState } from "react";

function Filter({ onSeachChange, onSelectChange }) {
  const [selectedOption, setselectedOption] = useState("titulo");
  const [seach, setSeach] = useState('');

  const handleSearchChange = (value) => {
    onSeachChange(value);
    setSeach(value);
  }

  const handleSelectChange = (value) => {
    onSelectChange(value);
    setselectedOption(value);
  }

  return (
    <div className="input-group">
      <input
        type="text"
        placeholder="Busque produto"
        className="form-control"
        aria-label="Text input with dropdown button"
        value={seach}
        onChange={(e) => handleSearchChange(e.target.value)} 
      />
      <select
        value={selectedOption}
        onChange={(e) => handleSelectChange(e.target.value)}
        className="form-select"
      >
        <option value='preco-maior-menor'>Preço (maior-menor)</option>
        <option value='preco-menor-maior'>Preço (menor-maior)</option>
        <option value='nome'>Nome</option>
      </select>
    </div>
  );
}

export default Filter;