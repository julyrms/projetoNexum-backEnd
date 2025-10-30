const categoriasModel = require("../models/categoriasModel");

const criarCategoria = async (req, res) => {
  const { nome } = req.body;
  try {
    const categoria = await categoriasModel.criarCategoria(nome);
    res.status(201).json(categoria);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao criar nova categoria", detalhe: error.message });
  }
};

const atualizarCategoria = async (req, res) => {
  const { id } = req.params; // O parâmetro 'id' é passado na URL
  const { nome } = req.body;

  try {
    // Chamando o modelo para atualizar a categoria, passando 'id' como parâmetro
    const categoriaAtualizada = await categoriasModel.atualizarCategoria(id, {
      nome,
    });
    res.json(categoriaAtualizada);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao atualizar categoria",
      detalhe: error.message,
    });
  }
};

const apagarCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    await categoriasModel.apagarCategoria(id);
    res.json({ mensagem: "Categoria excluída com sucesso!" });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao apagar categoria",
      detalhe: error.message,
    });
  }
};

const todasCategorias = async (req, res) => {
  try {
    const categorias = await categoriasModel.todasCategorias();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao selecionar todas categorias",
      detalhe: error.message,
    });
  }
};

// const pesquisarCategoriaCidade = async (req, res) => {
//   const { localizacao } = req.body;
//   try {
//     const categorias = await categoriasModel.pesquisarCategoriaCidade(
//       localizacao
//     );
//     if (!categorias) {
//       return res.status(404).json({ erro: "Categoria não encontrada" });
//     }
//     res.json(categorias);
//   } catch (error) {
//     res.status(500).json({
//       erro: "Erro ao buscar categorias",
//       detalhe: error.message,
//     });
//   }
// };

const pesquisarCategoriaNome = async (req, res) => {
  const { nome } = req.body;
  try {
    const categorias = await categoriasModel.pesquisarCategoriaNome(nome);
    if (!categorias) {
      return res.status(404).json({ erro: "Categoria não encontrada" });
    }
    res.json(categorias);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar categorias",
      detalhe: error.message,
    });
  }
};

module.exports = {
  criarCategoria,
  atualizarCategoria,
  apagarCategoria,
  todasCategorias,
  pesquisarCategoriaNome,
};
