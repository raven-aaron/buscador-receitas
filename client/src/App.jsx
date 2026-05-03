import { useState } from 'react';
import axios from 'axios';

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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>Recipe Search</h1>
      
      <form onSubmit={buscarReceitas} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          value={ingredientes}
          onChange={(e) => setIngredientes(e.target.value)}
          placeholder="Ex: Tomato, Carrot, Onion"
          style={{ flex: 1, padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', borderRadius: '4px', border: 'none', backgroundColor: '#28a745', color: 'white' }}>
          Buscar
        </button>
      </form>

      {erro && <p style={{ color: 'red', textAlign: 'center' }}>{erro}</p>}

      {carregando && <p style={{ textAlign: 'center' }}>Searching for recipes...</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {receitas.map((receita) => (
          <div key={receita.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '15px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <img src={receita.image} alt={receita.title} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '4px' }} />
            <h3 style={{ fontSize: '18px', margin: '15px 0 10px 0' }}>{receita.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}