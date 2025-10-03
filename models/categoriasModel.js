const conexao = require("../conexao");

const criarCategoria = async (nome) => {
  const query = "INSERT INTO categorias (nome) VALUES ($1) RETURNING *";
  const valores = [nome];
  const { rows } = await conexao.query(query, valores);
  return rows;
};

const atualizarCategoria = async (id, dados) => {
  const { nome } = dados;
  const query = `UPDATE categorias SET nome = $1 WHERE id_categoria = $2 RETURNING *`; // Mudado para 'id_categoria'
  const { rows } = await conexao.query(query, [nome, id]);
  return rows[0];
};

const apagarCategoria = async (id) => {
  const query = "DELETE FROM categorias WHERE id_categoria = $1"; // Mudado para 'id_categoria'
  await conexao.query(query, [id]);
};

const todasCategorias = async () => {
  const query = "SELECT * FROM categorias";
  const { rows } = await conexao.query(query);
  return rows;
};

const pesquisarCategoriaNome = async (nome) => {
  const query = `SELECT id_categoria, nome FROM categorias WHERE nome ILIKE $1 ORDER BY nome ASC`;
  const { rows } = await conexao.query(query, [nome]);
  return rows;
};

const pesquisarCategoriaCidade = async (localizacao) => {
  const query = `SELECT id_categoria, nome FROM categorias WHERE localizacao ILIKE $1 ORDER BY localizacao ASC`;
  const { rows } = await conexao.query(query, [localizacao]);
  return rows;
};

module.exports = {
  criarCategoria,
  atualizarCategoria,
  apagarCategoria,
  todasCategorias,
  pesquisarCategoriaCidade,
  pesquisarCategoriaNome,
};
