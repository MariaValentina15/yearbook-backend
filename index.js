import express from 'express';

const app = express(); 
const PORT = 3000; 

// rota raiz
app.get('/', (req, res) => {
  res.json({ mensagem: 'Yearbook API está no ar! 🎓' });
});

// inicia servidor local (Vercel ignora)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

export default app;