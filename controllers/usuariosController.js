const usuariosModel = require("../models/usuariosModel");

const criarUsuario = async (req, res) => {
  const { nome, email, senha, celular, habilidades } = req.body;
  try {
    const senhaHash = await usuariosModel.gerarSenhaHash(senha);
    const usuario = await usuariosModel.criarUsuario(
      nome,
      email,
      senhaHash,
      celular,
      habilidades
    );
    res.status(201).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao criar usuário", detalhe: error.message });
  }
};

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await usuariosModel.buscarUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ erro: "Usuário não encontrado" });
    }
    console.log(senha);
    console.log(usuario.senha);
    const senhaValida = await usuariosModel.compararSenhas(
      senha,
      usuario.senha
    );
    if (!senhaValida) {
      return res.status(401).json({ erro: "Senha inválida" });
    }
    res.json({
      mensagem: "Login realizado com sucesso",
      usuario: {
        id: usuario.id_usuario,
        nome: usuario.nome,
        email: usuario.email,
        habilidades: usuario.habilidades,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar usuário", detalhe: error.message });
  }
};

const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, email, celular, habilidades } = req.body;

  try {
    const usuarioAtualizado = await usuariosModel.atualizarUsuario(id, {
      nome,
      email,
      celular,
      habilidades,
    });

    res.json(usuarioAtualizado);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro a atulizar usuário", detalhe: error.message });
  }
};

const buscarUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await usuariosModel.buscarUsuarioPorId(id);
    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscra usuário", detalhe: error.message });
  }
};

const apagarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await usuariosModel.apagarUsuario(id);
    res.json({ mensagem: "Usuário excluído com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao deletar usuário", detalhe: error.message });
  }
};

module.exports = {
  criarUsuario,
  loginUsuario,
  atualizarUsuario,
  buscarUsuarioPorId,
  apagarUsuario,
};
