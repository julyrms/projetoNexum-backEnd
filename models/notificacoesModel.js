// // notificações
// buscar todas notificações - select
// buscar notificações lidas - select c true
// buscar notificações não lidas - select c false
// deletar notificação - delete

const conexao = require("../conexao");

const todasNotificacoes = async () => {
  const query = "SELECT * FROM notificacoes";
  const { rows } = await conexao.query(query);
  return rows;
};

const notificacoesLidas = async () => {
  const query = "SELECT * FROM notificacoes WHERE lida = true";
  const { rows } = await conexao.query(query);
  return rows;
};

const notificacoesNaoLidas = async () => {
  const query = "SELECT * FROM notificacoes WHERE lida = false";
  const { rows } = await conexao.query(query);
  return rows;
};

const deletarNotificacao = async (id) => {
  const query = "DELETE FROM notificacoes WHERE id_notificacao = $1";
  await conexao.query(query, [id]);
};

module.exports = {
  todasNotificacoes,
  notificacoesLidas,
  notificacoesNaoLidas,
  deletarNotificacao,
};
