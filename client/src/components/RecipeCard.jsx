import './RecipeCard.css';

export default function RecipeCard({ receita }) {
  return (
    <div className="card-receita">
      <img 
        src={receita.image} 
        alt={receita.title} 
        className="imagem-receita"
      />
      <h3 className="titulo-receita">
        {receita.title}
      </h3>
      
      <div className="ingredientes-faltantes">
        <p className="titulo-ingredientes">Missing ingredients:</p>
        <ul>
          {receita.missedIngredients.map((ingrediente) => (
            <li key={ingrediente.id}>{ingrediente.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}