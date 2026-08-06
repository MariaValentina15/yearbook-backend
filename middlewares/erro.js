// Middleware de erro global — captura qualquer erro passado via next(erro)
// Tem 4 parâmetros (err, req, res, next) — é assim que o Express identifica
// que este é um middleware de erro
export default function tratarErro(err, req, res, next) {
  console.error('[ERRO]', err);                     // mostra o erro no terminal
  res.status(500).json({                             // resposta JSON padronizada
    erro: 'Erro interno do servidor',
  });
}