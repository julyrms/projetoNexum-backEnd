require("dotenv").config();
const express = require("express");
const cors = require("cors");
const conexao = require("./conexao"); // seu arquivo de conexão com o banco

// importação das rotas
const usuariosRoutes = require("./routes/usuariosRoutes");
const servicosRoutes = require("./routes/servicosRoutes");
const categoriasRoutes = require("./routes/categoriasRoutes");
const notificacoesRoutes = require("./routes/notificacoesRoutes");
const app = express();

app.use(cors()); // habilita CORS para todas as origens
app.use(express.json()); // permite receber JSON no body das requisições

// rotas
app.use("/usuarios", usuariosRoutes);
app.use("/servicos", servicosRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/notificacoes", notificacoesRoutes);

// rota para testar a conexão da API
app.get("/", (req, res) => {
  res.send("API Nexum funcionando!");
});

// inicia o servidor
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor executando em: http://localhost:${port}`);
});
