import { useState } from 'react';
import axios from 'axios';
import RecipeCard from './components/RecipeCard';
import './App.css';

export default function App() {
  const [ingredientes, setIngredientes] = useState('');
  const [receitas, setReceitas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  const buscarReceitas = async (e) => {
    e.preventDefault();

    if (!ingredientes.trim()) {
      setErro('Type at least one ingredient.');
      return;
    }

    setCarregando(true);
    setErro('');

    try {
      const response = await axios.get('http://localhost:5000/api/receitas', {
        params: { ingredientes }
      });
      setReceitas(response.data);
    } catch {
      setErro('Unable to load the recipes.');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="container">
      <h1 className="titulo-principal">Recipe Search</h1>
      
      <form onSubmit={buscarReceitas} className="formulario-busca">
        <input
          type="text"
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
          placeholder="Ex: Tomato, Carrot, Onion"
          className="input-busca"
        />
        <button type="submit" className="botao-busca">
          Search
        </button>
      </form>

      {erro && <p className="mensagem-erro">{erro}</p>}

      {carregando && <p className="mensagem-carregando">Searching for recipes...</p>}

      <div className="grid-receitas">
        {receitas.map((receita) => (
          <RecipeCard key={receita.id} receita={receita} />
        ))}
      </div>
    </div>
  );
}