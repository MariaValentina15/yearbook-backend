// 1. Imports
import express from 'express';
import logger from './middlewares/logger.js';
import alunosRouter from './routes/alunos.js';

// 2. Criar app e definir porta
const app = express();
const PORT = 3000;

// 3. Middlewares globais (na ordem correta)
app.use(express.json());    // parseia body JSON
app.use(logger);            // registra log

// 4. Rotas
app.get('/', (req, res) => {
  res.json({ mensagem: 'Yearbook API está no ar! 🎓' });
});

app.get('/status', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

app.use('/alunos', alunosRouter);

// 5. Iniciar servidor localmente (Vercel ignora)
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

// 6. Exportar app para a Vercel
export default app;