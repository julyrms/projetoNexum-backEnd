const servicosModel = require("../models/servicosModel");

const procurarServicos = async (req, res) => {
  try {
    const servicos = await servicosModel.procurarServicos();
    res.json(servicos);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao selecionar todos o serviços",
      detalhe: error.message,
    });
  }
};

const procurarServicoPorIdCategoria = async (req, res) => {
  const { id } = req.params;
  const category_id = parseInt(id, 10);
  if (isNaN(category_id)) {
    return res.status(400).json({ erro: "ID de categoria inválido" });
  }

  try {
    const servico = await servicosModel.procurarServicoPorIdCategoria(
      category_id
    );
    if (!servico || servico.length === 0) {
      return res.status(404).json({ erro: "Serviço não encontrado" });
    }
    res.json(servico);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscarserviços", detalhe: error.message });
  }
};

const procurarServicosPorUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const servicos = await servicosModel.procurarServicosPorUsuario(id);
    res.json(servicos);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar serviços do usuário",
      detalhe: error.message,
    });
  }
};

const procurarServicoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const servico = await servicosModel.procurarServicoPorId(id);
    if (!servico) {
      return res.status(404).json({ erro: "Serviço não encontrado" });
    }
    res.json(servico);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar serviço", detalhe: error.message });
  }
};

const postarServico = async (req, res) => {
  const { user_id, category_id, nome, descricao, valor, localizacao } =
    req.body;
  try {
    const servico = await servicosModel.postarServico(
      user_id,
      category_id,
      nome,
      descricao,
      valor,
      localizacao
    );
    res.status(201).json(servico);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao adicionar serviço", detalhe: error.message });
  }
};

const atualizarServico = async (req, res) => {
  const { id } = req.params;
  const { category_id, nome, descricao, valor, localizacao } = req.body;
  try {
    const servicoAtualizado = await servicosModel.atualizarServico(id, {
      category_id,
      nome,
      descricao,
      valor,
      localizacao,
    });
    res.json(servicoAtualizado);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao atualizar serviço", detalhe: error.message });
  }
};

const apagarServico = async (req, res) => {
  const { id } = req.params;
  try {
    await servicosModel.apagarServico(id);
    res.json({ mensagem: "Serviço excluído com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao deletar serviço", detalhe: error.message });
  }
};

const pesquisarServicoCidade = async (req, res) => {
  const { localizacao } = req.body;
  try {
    const servicos = await servicosModel.pesquisarServicoCidade(localizacao);
    if (!servicos) {
      return res.status(404).json({ erro: "Serviço não encontrado" });
    }
    res.json(servicos);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar serviços",
      detalhe: error.message,
    });
  }
};

module.exports = {
  procurarServicoPorIdCategoria,
  procurarServicos,
  postarServico,
  atualizarServico,
  apagarServico,
  pesquisarServicoCidade,
  procurarServicosPorUsuario,
  procurarServicoPorId,
};
