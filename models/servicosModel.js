//  servicos
//  procurar servicos - select
//  procurar servico por id de categoria - select com where
//  postar servico - insert
//  atualizar servico - update
//  apagar servico - delete

const conexao = require("../conexao");

const procurarServicos = async () => {
  const query = `
    SELECT 
      s.id_servico,
      s.nome,
      s.descricao,
      s.valor,
      s.localizacao,
      s.criacao,
      s.atualizado,
      s.user_id,
      u.nome AS nome_usuario,
      c.nome AS nome_categoria
    FROM servicos s
    JOIN usuarios u ON s.user_id = u.id_usuario
    JOIN categorias c ON s.category_id = c.id_categoria
    ORDER BY s.criacao DESC;
  `;
  const { rows } = await conexao.query(query);
  return rows;
  // const query = "SELECT * FROM servicos";
  // const { rows } = await conexao.query(query);
  // return rows;
};

const procurarServicoPorIdCategoria = async (category_id) => {
  const query = `
    SELECT 
      s.user_id, s.nome, s.descricao, s.valor, s.localizacao, s.criacao, s.atualizado,
      u.id_usuario, u.nome AS nome_usuario,
      c.id_categoria, c.nome AS nome_categoria
    FROM servicos s
    JOIN usuarios u ON s.user_id = u.id_usuario
    JOIN categorias c ON s.category_id = c.id_categoria
    WHERE s.category_id = $1
    ORDER BY s.criacao DESC
  `;
  const { rows } = await conexao.query(query, [category_id]);
  return rows;
};

const procurarServicosPorUsuario = async (id) => {
  const query = `
    SELECT 
      s.id_servico,
      s.nome,
      s.descricao,
      s.valor,
      s.localizacao,
      s.category_id,
      c.nome AS nome_categoria
    FROM servicos s
    JOIN categorias c ON s.category_id = c.id_categoria
    WHERE s.user_id = $1
    ORDER BY s.criacao DESC;
  `;
  const { rows } = await conexao.query(query, [id]);
  return rows;
};

const procurarServicoPorId = async (id) => {
  const query = `
    SELECT 
      s.id_servico,
      s.nome,
      s.descricao,
      s.valor,
      s.localizacao,
      s.category_id,
      c.nome AS nome_categoria
    FROM servicos s
    JOIN categorias c ON s.category_id = c.id_categoria
    WHERE s.id_servico = $1
  `;
  const { rows } = await conexao.query(query, [id]);
  return rows[0];
};

const postarServico = async (
  user_id,
  category_id,
  nome,
  descricao,
  valor,
  localizacao
) => {
  const query = `
    INSERT INTO servicos (user_id, category_id, nome, descricao, valor, localizacao)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  const valores = [user_id, category_id, nome, descricao, valor, localizacao];

  const { rows } = await conexao.query(query, valores);
  return rows[0];
};

const atualizarServico = async (id_servico, dados) => {
  const { category_id, nome, descricao, valor, localizacao } = dados;
  const query = `
    UPDATE servicos 
    SET category_id = $1, nome = $2, descricao = $3, valor = $4, localizacao = $5
    WHERE id_servico = $6
    RETURNING *
  `;
  const valores = [
    category_id,
    nome,
    descricao,
    valor,
    localizacao,
    id_servico,
  ];
  const { rows } = await conexao.query(query, valores);
  return rows[0];
};

const apagarServico = async (id) => {
  const query = "DELETE FROM servicos WHERE id_servico = $1";
  await conexao.query(query, [id]);
};

const pesquisarServicoCidade = async (localizacao) => {
  const query = `SELECT id_servico, nome, descricao, valor, localizacao, category_id, user_id FROM servicos WHERE localizacao ILIKE $1 ORDER BY localizacao ASC`;
  const { rows } = await conexao.query(query, [localizacao]);
  return rows;
};

module.exports = {
  procurarServicos,
  procurarServicoPorIdCategoria,
  postarServico,
  atualizarServico,
  apagarServico,
  pesquisarServicoCidade,
  procurarServicosPorUsuario,
  procurarServicoPorId,
};
