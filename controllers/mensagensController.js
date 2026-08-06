import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// GET /mensagens — lista todas as mensagens (mais recentes primeiro, com dados do autor)
export async function listarMensagens(req, res, next) {
  try {
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
  } catch (erro) {
    next(erro); // passa o erro para o middleware global
  }
}

// POST /mensagens — cria uma nova mensagem
export async function criarMensagem(req, res, next) {
  try {
    const { texto, imagemUrl, autorId } = req.body;

    // validação obrigatória
    if (!texto) {
      return res.status(400).json({ erro: 'O campo texto é obrigatório' });
    }

    const mensagemCriada = await prisma.mensagem.create({
      data: {
        texto,
        imagemUrl,
        autorId: Number(autorId),
      },
    });

    return res.status(201).json(mensagemCriada);
  } catch (erro) {
    next(erro); // passa o erro para o middleware global
  }
}

// DELETE /mensagens/:id — deleta uma mensagem
export async function deletarMensagem(req, res, next) {
  try {
    const { id } = req.params;

    await prisma.mensagem.delete({
      where: {
        id: Number(id)
      }
    });

    return res.status(204).send();

  } catch (erro) {
    // 404 é um erro esperado aqui, então tratamos direto
    if (erro.code === 'P2025') {
      return res.status(404).json({ erro: 'Mensagem não encontrada' });
    }
  }
}