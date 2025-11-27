const conexao = require("../conexao");
const bcrypt = require("bcrypt");

const criarUsuario = async (nome, email, senhaHash, celular, habilidades) => {
  const query =
    "INSERT INTO usuarios (nome, email, senha, celular, habilidades) VALUES ($1, $2, $3, $4, $5) RETURNING id_usuario, nome, email, habilidades";
  const valores = [
    nome,
    email,
    senhaHash,
    celular,
    JSON.stringify(habilidades),
  ];

  const { rows } = await conexao.query(query, valores);
  return rows[0];
};

const gerarSenhaHash = async (senha) => {
  return bcrypt.hash(senha, 10);
};

const compararSenhas = async (senha, senhaHash) => {
  return bcrypt.compare(senha, senhaHash);
};

const buscarUsuarioPorEmail = async (email) => {
  const query =
    "SELECT id_usuario, nome, email, senha, habilidades FROM usuarios WHERE email = $1";
  const { rows } = await conexao.query(query, [email]);
  return rows[0];
};

const atualizarUsuario = async (id_usuario, dados) => {
  const { nome, email, celular, habilidades } = dados;

  const query = `
    UPDATE usuarios 
    SET nome = $1, email = $2, celular = $3, habilidades = $4
    WHERE id_usuario = $5
    RETURNING *`;

  const valores = [
    nome,
    email,
    celular,
    JSON.stringify(habilidades),
    id_usuario,
  ];

  const { rows } = await conexao.query(query, valores);
  return rows[0];
};

const apagarUsuario = async (id) => {
  const query = "DELETE FROM usuarios WHERE id_usuario = $1";
  await conexao.query(query, [id]);
};

const buscarUsuarioPorId = async (id) => {
  const query =
    "SELECT id_usuario, nome, email, celular, habilidades, servico_postado_contagem FROM usuarios WHERE id_usuario = $1";
  const { rows } = await conexao.query(query, [id]);
  return rows[0];
};

module.exports = {
  criarUsuario,
  gerarSenhaHash,
  compararSenhas,
  atualizarUsuario,
  apagarUsuario,
  buscarUsuarioPorId,
  buscarUsuarioPorEmail,
};
