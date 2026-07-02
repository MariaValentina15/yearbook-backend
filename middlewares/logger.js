// Middleware de log — registra cada requisição no terminal
export default function logger(req, res, next) {
  const inicio = Date.now();

  res.on('finish', () => {
    const duracao = Date.now() - inicio;
    const agora = new Date().toISOString();

    console.log(
      `[${agora}] ${req.method} ${req.originalUrl} → ${res.statusCode} (${duracao}ms)`
    );
  });

  next();
}