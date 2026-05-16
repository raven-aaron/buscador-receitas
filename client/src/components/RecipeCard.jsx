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
    </div>
  );
}