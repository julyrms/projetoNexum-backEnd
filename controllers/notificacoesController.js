const notificacoesModel = require("../models/notificacoesModel");

const todasNotificacoes = async (req, res) => {
  try {
    const notificacoes = await notificacoesModel.todasNotificacoes();
    res.json(notificacoes);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao selecionar todas as categorias",
      detalhe: error.message,
    });
  }
};

const notificacoesLidas = async (req, res) => {
  try {
    const notificacaoLida = await notificacoesModel.notificacoesLidas();
    res.json(notificacaoLida);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao selecionar notificações lidas",
      detalhe: error.message,
    });
  }
};

const notificacoesNaoLidas = async (req, res) => {
  try {
    const notificacaoNaoLida = await notificacoesModel.notificacoesNaoLidas();
    res.json(notificacaoNaoLida);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao selecionar notificações não lidas",
      detalhe: error.message,
    });
  }
};

const deletarNotificacao = async (req, res) => {
  const { id } = req.params;
  try {
    await notificacoesModel.deletarNotificacao(id);
    res.json({ mensgaem: "Notificação deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao deletar notificação",
      detalhe: error.message,
    });
  }
};

module.exports = {
  todasNotificacoes,
  notificacoesLidas,
  notificacoesNaoLidas,
  deletarNotificacao,
};
