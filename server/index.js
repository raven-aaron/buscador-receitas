import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/receitas', async (req, res) => {
  const { ingredientes } = req.query;

  if (!ingredientes) {
    return res.status(400).json({ error: 'Ingredientes são obrigatórios' });
  }

  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
      params: {
        ingredients: ingredientes,
        number: 6,
        apiKey: process.env.SPOONACULAR_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar receitas' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});