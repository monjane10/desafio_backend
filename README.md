# 🌾 API de Gestão AgroTech

## 🚀 Introdução

API RESTful para gestão de empresas, campanhas, técnicos, produtores e seus relacionamentos (atribuição e transferência).

Tecnologias utilizadas:
- Node.js com Express.js
- Base de dados SQL (MySQL/PostgreSQL)
- Arquitetura MVC (Model-View-Controller)
- Validações básicas e tratamento de erros

**Base URL (local)**: `http://localhost:3000`


## 📦 Instalação

git clone https://github.com/monjane10/desafio_backend.git
cd desafio_backend
npm install
Crie um arquivo .env na raiz com a variável:
DB_PASSWORD=tua_senha

Inicie a aplicação:
npm run dev

🧾 Endpoints da API
1. 📘 Cadastro de Empresas
POST /empresas

Body JSON:
{
  "nome": "Empresa X",
  "cnpj": "12345678000100",
  "telefone": "999999999",
  "email": "contato@empresa.com"
}
Resposta (201):
{
  "id": 1,
  "nome": "Empresa X",
  "cnpj": "12345678000100",
  "telefone": "999999999",
  "email": "contato@empresa.com"
}
Erros possíveis:
400 Campos obrigatórios ausentes
500 Erro interno do servidor

2. 📘 Cadastro de Campanhas
POST /campanhas

Body JSON:
{
  "nome": "Safra Primavera",
  "empresa_id": 1,
  "data_fim": "2025-12-31"
}
Resposta (201):

{
  "id": 5,
  "nome": "Safra Primavera",
  "empresa_id": 1,
  "data_inicio": "2025-08-01",
  "data_fim": "2025-12-31"
}
3. 📘 Cadastro de Técnicos
POST /tecnicos

Body JSON:

{
  "nome": "Carlos Silva",
  "campanha_id": 5
}
Resposta (201):

{
  "id": 2,
  "nome": "Carlos Silva",
  "campanha_id": 5
}
4. 📘 Cadastro de Produtores
POST /produtores

Body JSON:
{
  "nome": "João da Terra",
  "localizacao": "Zona Rural"
}
Resposta (201):

{
  "id": 3,
  "nome": "João da Terra",
  "localizacao": "Zona Rural"
}
5. 🔄 Atribuir Produtor a Técnico
POST /produtores/atribuir

Body JSON:
{
  "produtor_id": 3,
  "tecnico_id": 2,
  "campanha_id": 5
}
Resposta (200):
{
  "mensagem": "Produtor atribuído com sucesso",
  "relacionamento": {
    "produtor_id": 3,
    "tecnico_id": 2,
    "campanha_id": 5,
    "data_registro": "2025-08-06T20:31:52Z"
  }
}
6. 🔄 Transferir Produtor entre Técnicos
PUT /produtores/transferir

Body JSON:
{
  "produtor_id": 3,
  "tecnico_antigo_id": 2,
  "tecnico_novo_id": 4,
  "campanha_id": 5
}
Resposta (200):

{
  "mensagem": "Transferência realizada com sucesso.",
  "relacionamento": {
    "produtor_id": 3,
    "tecnico_novo_id": 4,
    "campanha_id": 5,
    "data_transferencia": "2025-08-06T20:45:12.345Z"
  }
}
7. 📋 Listar Produtores de um Técnico
GET /tecnicos/:id/produtores
GET http://localhost:3000/tecnicos/2/produtores
Resposta (200):

  {
    "id": 3,
    "nome": "João da Terra",
    "localizacao": "Zona Rural"
  },
  {
    "id": 5,
    "nome": "Maria do Campo",
    "localizacao": "Fazenda Verde"
  }
Erros possíveis:
400 ID inválido
404 Nenhum produtor encontrado

Testes via curl
Criar empresa:

curl -X POST http://localhost:3000/empresas \
  -H "Content-Type: application/json" \
  -d '{"nome":"Empresa X","cnpj":"12345678000100","telefone":"999","email":"contato@xi.com"}'


🗃️ Estrutura da base de Dados (MySQL/PostgreSQL)

CREATE TABLE empresas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  cnpj VARCHAR(20) NOT NULL UNIQUE,
  telefone VARCHAR(15),
  email VARCHAR(100)
);

CREATE TABLE campanhas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  empresa_id INTEGER REFERENCES empresas(id),
  data_inicio DATE NOT NULL,
  data_fim DATE
);

CREATE TABLE tecnicos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  campanha_id INTEGER REFERENCES campanhas(id)
);

CREATE TABLE produtores (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  localizacao VARCHAR(255)
);

CREATE TABLE produtores_campanhas (
  id SERIAL PRIMARY KEY,
  produtor_id INTEGER REFERENCES produtores(id),
  campanha_id INTEGER REFERENCES campanhas(id),
  tecnico_id INTEGER REFERENCES tecnicos(id),
  data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_transferencia TIMESTAMP
);
📌 Organização do Projeto
pgsql
Copiar
Editar
src/
├── app/
│   ├── controllers/
│   ├── database/
│   ├── models/
│   ├── routes.js
├── config/
├── .env
├── server.js
📫 Contacto
Desenvolvido por Monjane 💻
Repositório: github.com/monjane10/desafio_backend
