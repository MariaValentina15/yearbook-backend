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
  // senhaHash NÃO está aqui — nunca retornado pela API
};

// GET /alunos — lista todos os alunos
export async function listarAlunos(req, res) {
  const alunos = await prisma.aluno.findMany({
    select: selectSemSenha, // retorna todos os campos EXCETO senhaHash
  });
  res.json(alunos); // responde com o array de alunos em JSON
}

// GET /alunos/:id — busca um aluno pelo ID
export async function buscarAluno(req, res) {
  const { id } = req.params; // extrai o :id da URL
  const aluno = await prisma.aluno.findUnique({
    where: { id: Number(id) }, // converte string → number
    select: selectSemSenha,    // omite senhaHash
  });

  if (!aluno) {
    return res.status(404).json({ erro: 'Aluno não encontrado' }); // null → 404
  }

  res.json(aluno); // retorna o aluno encontrado
}

// --- Stubs para o desafio do aluno ---

// 🎯 POST /alunos — cria um novo aluno
// Dica: use prisma.aluno.create({ data: { ... }, select: selectSemSenha })
// Dica: os dados do aluno vêm de req.body (nome, email, senhaHash, cidade, frase, planosFuturos)
// Dica: retorne status 201 com o aluno criado
export async function criarAluno(req, res) {
  // implemente aqui
}

// 🎯 PUT /alunos/:id — atualiza um aluno existente
// Dica: use prisma.aluno.update({ where: { id: Number(id) }, data: { ... }, select: selectSemSenha })
// Dica: o id vem de req.params, os dados atualizados de req.body
// Dica: se o aluno não existir, o Prisma lança um erro — use try/catch
export async function atualizarAluno(req, res) {
  // implemente aqui
}

// 🎯 DELETE /alunos/:id — deleta um aluno
// Dica: use prisma.aluno.delete({ where: { id: Number(id) } })
// Dica: retorne status 204 (sem conteúdo) com res.status(204).end()
// Dica: se o aluno não existir, o Prisma lança um erro — use try/catch
export async function deletarAluno(req, res) {
  // implemente aqui
}