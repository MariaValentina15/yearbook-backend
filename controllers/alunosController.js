import prisma from '../prisma/client.js'; // importa o singleton do Prisma

// select que omite senhaHash — reutilizado em todas as queries de alunos
const selectSemSenha = {
  id: true,
  nome: true,
  email: true,
  cidade: true,
  frase: true,
  planosFuturos: true,
  fotoUrl: true,
  role: true,
  criadoEm: true,
  // senhaHash NÃO está aqui — nunca retornado pela API no selectSemSenha
};

// GET /alunos — lista todos os alunos
export async function listarAlunos(req, res, next) {
  try {
    const alunos = await prisma.aluno.findMany({
      select: selectSemSenha,
    });
    res.json(alunos);
  } catch (erro) {
    next(erro);  // passa o erro para o middleware global
  }
}

// GET /alunos/:id — busca um aluno pelo ID
export async function buscarAluno(req, res, next) {
  try {
    const { id } = req.params; // extrai o :id da URL
    const aluno = await prisma.aluno.findUnique({
      where: { id: Number(id) }, // converte string → number
      select: selectSemSenha,    // omite senhaHash
    });

    if (!aluno) {
      return res.status(404).json({ erro: 'Aluno não encontrado' }); // null → 404
    }

    res.json(aluno); // retorna o aluno encontrado
  } catch (erro) {
    next(erro); // passa o erro para o middleware global
  }
}

// POST /alunos — cria um novo aluno
export async function criarAluno(req, res, next) {
  try {
    const { nome, email, senhaHash, cidade, frase, planosFuturos } = req.body;

    const alunoCriado = await prisma.aluno.create({
      data: {
        nome,
        email,
        senhaHash,
        cidade,
        frase,
        planosFuturos
      },
      select: selectSemSenha
    });

    return res.status(201).json(alunoCriado);
  } catch (erro) {
    next(erro); // passa o erro inesperado para o middleware global
  }
}

// PUT /alunos/:id — atualiza um aluno existente
export async function atualizarAluno(req, res, next) {
  const { id } = req.params;
  const { nome, email, senhaHash, cidade, frase, planosFuturos } = req.body;

  try {
    const alunoAtualizado = await prisma.aluno.update({
      where: {
        id: Number(id),
      },
      data: {
        nome,
        email,
        senhaHash,
        cidade,
        frase,
        planosFuturos,
      },
      select: selectSemSenha,
    });

    return res.json(alunoAtualizado);
  } catch (erro) {
    return res.status(404).json({ erro: 'Aluno não encontrado' });
  }
}

// DELETE /alunos/:id — deleta um aluno
export async function deletarAluno(req, res, next) {
  const { id } = req.params;

  try {
    await prisma.aluno.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(204).end();
  } catch (erro) {
    return res.status(404).json({ erro: 'Aluno não encontrado' });
  }
}