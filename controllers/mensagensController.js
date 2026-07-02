import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// GET /mensagens — lista todas as mensagens (mais recentes primeiro, com dados do autor)
export async function listarMensagens(req, res) {
  const mensagens = await prisma.mensagem.findMany({
    orderBy: { criadoEm: 'desc' },  // mais recente primeiro
    include: {
      autor: {                        // traz dados do autor junto
        select: {
          nome: true,                 // nome do autor
          fotoUrl: true,              // foto do autor
        },
      },
    },
  });
  res.json(mensagens); // retorna a lista com autor embutido
}

// --- Stubs para o desafio do aluno ---

// 🎯 POST /mensagens — cria uma nova mensagem
// Siga o mesmo padrão do criarAluno
// Valide que texto não está vazio (400 se faltar)
export async function criarMensagem(req, res) {
  const { texto, imagemUrl, autorId } = req.body;

  // validação obrigatória
  if (!texto) {
    return res.status(400).json({ erro: "Texto é obrigatório" });
  }

  const mensagemCriada = await prisma.mensagem.create({
    data: {
      texto,
      imagemUrl,
      autorId: Number(autorId),
    },
  });

  return res.status(201).json(mensagemCriada);
}

// 🎯 DELETE /mensagens/:id — deleta uma mensagem
// Siga o mesmo padrão do deletarAluno
// 🎯 DELETE /mensagens/:id — deleta uma mensagem
export async function deletarMensagem(req, res) {
  try {
    // 1. Extraia o ID dos parâmetros da rota
    const { id } = req.params;

    // 2. Tente deletar a mensagem usando o Prisma
    await prisma.mensagem.delete({
      where: {
        id: Number(id) // Convertendo para número, já que da URL vem como string
      }
    });

    // 3. Se deu certo, retorne status 204 (No Content) sem corpo (send vazio)
    return res.status(204).send();

  } catch (error) {
    // 4. Se o Prisma não encontrar o ID, ele retorna o erro P2025
    if (error.code === 'P2025') {
      return res.status(404).json({ erro: 'Mensagem não encontrada.' });
    }

    // Para outros erros inesperados
    console.error("Erro ao deletar mensagem:", error);
    return res.status(500).json({ erro: 'Erro interno do servidor.' });
  }
}