# API do Yearbook — Documentação de Endpoints

    Base URL (produção): `https://yearbook-backend.vercel.app`

    ## Convenções

    - Todas as respostas são em JSON
    - Rotas protegidas exigem header `Authorization: Bearer <token>`
    - O campo `senhaHash` nunca é retornado em nenhuma resposta
    - Erros seguem o formato `{ "erro": "mensagem descritiva" }`
    ## Auth
    ## Alunos 

### POST /auth/register

    Cria uma nova conta de aluno.

    - **Autenticação:** Não
    - **Body:**

    ```json
    {
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "senha": "minhasenha123",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG"
    }
    ```

    - **Resposta de sucesso:** `201 Created`

    ```json
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG",
      "fotoUrl": null,
      "role": "USER",
      "criadoEm": "2026-04-03T10:30:00.000Z"
    }
    ```

    - **Erros:**
      - `400` — Campos obrigatórios ausentes
      - `409` — Email já cadastrado

### POST /auth/login

    Autentica um aluno e retorna um token JWT.

    - **Autenticação:** Não
    - **Body:**

    ```json
    {
      "email": "maria@email.com",
      "senha": "minhasenha123"
    }
    ```

    - **Resposta de sucesso:** `200 OK`

    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

    - **Erros:**
      - `401` — Credenciais inválidas (email não existe ou senha incorreta)

      ## Alunos

### GET /alunos

Retorna a lista completa com todos os alunos.

- **Autenticação:** Não
- **Body:** Não possui.

- **Resposta de sucesso:** `200 OK`

```json
[
    {
      "id": 1,
      "nome": "Maria Silva",
      "email": "maria@email.com",
      "cidade": "Salinas",
      "frase": "Aqui começa o futuro.",
      "planosFuturos": "Cursar Ciência da Computação na UFMG",
      "fotoUrl": null,
      "role": "USER",
      "criadoEm": "2026-04-03T10:30:00.000Z"
    }
]
```

- **Erros:**
  - `500` — Erro interno do servidor

---

### GET /alunos/:id

Retorna um aluno em específico.

- **Autenticação:** Não
- **Body:** Não possui.

- **Resposta de sucesso:** `200 OK`

```json
{
  "id": 1,
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "cidade": "Salinas",
  "frase": "Aqui começa o futuro.",
  "planosFuturos": "Cursar Ciência da Computação na UFMG",
  "fotoUrl": null,
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `500` — Erro interno do servidor
  - `404` — Aluno não encontrado (Id inexistente)

---

### PUT /alunos/:id

Atualiza as informações de um aluno específico

- **Autenticação:** Bearer token
- **Body:**

```json
{
  "nome": "Maria Valentina",
  "cidade": "Curral de Dentro",
  "frase": "Vou ser muito rica",
  "planosFuturos": "Ser muito rica",
  "fotoUrl": null
}
```

- **Resposta de sucesso:** `200 OK`

```json
{
  "id": 1,
  "nome": "Maria Valentina",
  "email": "maria@email.com",
  "cidade": "Curral de Dentro",
  "frase": "Vou ser muito rica",
  "planosFuturos": "Ser muito rica",
  "fotoUrl": null,
  "role": "USER",
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

 - **Erros:**
  - `500` — Erro interno do servidor
  - `401` — Usuário não autenticado
  - `403` — Este usuário não possui permissão para realizar esta solicitação
  - `404` — Aluno não encontrado (Id inexistente)

---

### DELETE /alunos/:id

Remove um aluno do sistema.

- **Autenticação:** Bearer token (admin)
- **Body:** Não possui.

- **Resposta de sucesso:** `204 No Content`

 - **Erros:**
  - `401` — Usuário não autenticado
  - `403` — Acesso permitido apenas para administradores
  - `404` — Aluno não encontrado
  - `500` — Erro interno do servidor

> Nenhum endpoint de `/alunos` retorna o campo `senhaHash`.

---

## Mensagens

### GET /mensagens

Retorna todas as mensagens do mural.

- **Autenticação:** Não
- **Body:** Não possui.

- **Resposta de sucesso:** `200 OK`

```json
[
    {
      "id": 1,
      "texto": "Foi muito bom estudar aqui.",
      "imagemUrl": null,
      "autorId": 1,
      "criadoEm": "2026-04-03T10:30:00.000Z",
      "autor": {
        "id": 1,
        "nome": "Maria Silva",
        "fotoUrl": "https://imagem.com/foto.jpg"}
    }
]
```

- **Erros:**
  - `500` — Erro interno do servidor

---

### POST /mensagens

Cria uma nova mensagem no mural.

- **Autenticação:** Bearer token
- **Body:**

```json
{
  "texto": "Nunca desistam dos seus sonhos.",
  "imagemUrl": "https://imagem.com/mensagem.jpg"
}
```

- **Resposta de sucesso:** `201 Created`

```json
{
  "id": 1,
  "texto": "Nunca desistam dos seus sonhos.",
  "imagemUrl": "https://imagem.com/mensagem.jpg",
  "autorId": 1,
  "criadoEm": "2026-04-03T10:30:00.000Z"
}
```

- **Erros:**
  - `400` — Campo texto é obrigatório
  - `401` — Usuário não autenticado
  - `500` — Erro interno do servidor

---

### DELETE /mensagens/:id

Remove uma mensagem do mural.

- **Autenticação:** Bearer token
- **Body:** Não possui.

- **Resposta de sucesso:** `204 No Content`

- **Erros:**
  - `401` — Usuário não autenticado
  - `403` — Apenas o dono da mensagem ou um administrador podem excluir
  - `404` — Mensagem não encontrada
  - `500` — Erro interno do servidor