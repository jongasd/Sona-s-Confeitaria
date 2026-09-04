const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/bootstrap",
  express.static(path.join(__dirname, "node_modules/bootstrap/dist")),
);

// Banco de dados em memória (Simulação do Banco de Dados Backend / Painel Admin)
let docesDatabase = [
  {
    id: 1,
    nome: "Entremet Gianduja & Avelã",
    categoria: "bolos",
    categoriaLabel: "Bolos Inteiros",
    tag: "Mais Pedido",
    tagClass: "bg-atelier-primary text-white",
    descricao:
      "Mousse de chocolate belga 70%, praliné crocante de avelãs do Piemonte e biscoito dacquoise.",
    rendimento: "Serve 10 a 12 pessoas (1.4 kg)",
    iconeRendimento: "group",
    avaliacao: 4.9,
    numAvaliacoes: 124,
    preco: 295.0,
    imagem:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBfG-0FjtMeNq1nWTzM8MXd4D3bXGNKJB2CccvyOTliOLQqSIMcRs5GbfUDeBJ1IN1FkHYGUO54kPmpMlnxf6xMD3qRNszjAcyCP3fYeiA2YQkGliWyuBHc30IiVusnbEuMAXUkwt0APnircqSHIxtoRYVpNeqy6ptOy8ur1oJQtA42lA8BmFtma1oMLxWRL3aH7I6O-dQmuB3W3Te1c-2mfxWUb8674zCu9YqF0Kd75io7Mf-6badNhQ",
    disponivel: true,
  },
  {
    id: 2,
    nome: "Coffret Écrin Botanique (16 un.)",
    categoria: "caixas",
    categoriaLabel: "Gift Boxes",
    tag: "Edição Especial",
    tagClass: "bg-atelier-secondary text-dark",
    descricao:
      "Bombons lapidados com pintura botânica à mão, recheados com cumaru, maracujá doce e gianduja crocante.",
    rendimento: "Inclui cartão caligrafado & fita de seda",
    iconeRendimento: "card_giftcard",
    avaliacao: 5.0,
    numAvaliacoes: 86,
    preco: 185.0,
    imagem:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWLUFYMqpwGLpWuyEUrrEA2DnfQ56fTaupCPNnmmIDrfnrQ1jRKT1jTri13k8_Q_fiEr-FXpUK4LEBj3-53SAZ1Gq1uBC6B5I97hcI9OdTE0tcGkagNoHis31d34X0at2y3rEsAF1DzcmuaVVHymIw08mTaZjXPatWYMDX9KlZ0jH5yvq-ofDjeKpq5aMKCmQCY2U-2JvfroroJJcYn5YHZ1fVr8frHsOOWHNcxui8KUD4gX0fZZGUHA",
    disponivel: true,
  },
  {
    id: 3,
    nome: "Tarte au Citron Meringuée",
    categoria: "sobremesas",
    categoriaLabel: "Sobremesas",
    tag: "Receita Tradicional",
    tagClass: "bg-white border text-dark",
    descricao:
      "Curd cremoso de limão siciliano em massa sablée crocante, coberta com merengue italiano queimado.",
    rendimento: "Serve 8 a 10 pessoas",
    iconeRendimento: "group",
    avaliacao: 4.8,
    numAvaliacoes: 98,
    preco: 210.0,
    imagem:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDv_r7ZAP0EVTqISlHSqeqXzMlB685ihMsBdUxI1Jg50ovJ1Palmf_uK4w3NZCRF3ODPPwduJFCOvqx2yxMqP20NNwZ0MksLA2zakreIx5XCDgpX-Vi9wNA1vqkeRu6QtjTTJFYkB8UbZ92nldAvy3zj-LfXbx7U91rF5xAJl9_ugYMyAg8Db4YLOxrJQ1k8SprrtF6jX5C42eHi0R-mbYRUOkbhlgkJDUFTUEXzsrBgus3cfDhEaZAhQ",
    disponivel: true,
  },
];

// --- ENDPOINTS DA API REST DO BACKEND ---

// 1. GET /api/doces - Retorna a vitrine de doces (com suporte a filtro por categoria)
app.get("/api/doces", (req, res) => {
  const { categoria } = req.query;
  if (categoria && categoria !== "todos") {
    const filtrados = docesDatabase.filter(
      (d) => d.categoria === categoria && d.disponivel,
    );
    return res.json({ status: "success", data: filtrados });
  }
  const ativos = docesDatabase.filter((d) => d.disponivel);
  res.json({ status: "success", data: ativos });
});

// 2. POST /api/doces - Adicionar um novo doce manualmente pelo Backend / Painel Admin
app.post("/api/doces", (req, res) => {
  const {
    nome,
    categoria,
    categoriaLabel,
    tag,
    tagClass,
    descricao,
    rendimento,
    iconeRendimento,
    preco,
    imagem,
  } = req.body;

  if (!nome || !preco || !categoria) {
    return res.status(400).json({
      status: "error",
      message: "Nome, preço e categoria são obrigatórios.",
    });
  }

  const novoDoce = {
    id: Date.now(),
    nome,
    categoria,
    categoriaLabel: categoriaLabel || "Geral",
    tag: tag || "Novo",
    tagClass: tagClass || "bg-atelier-primary text-white",
    descricao: descricao || "",
    rendimento: rendimento || "Porção individual",
    iconeRendimento: iconeRendimento || "restaurant",
    avaliacao: 5.0,
    numAvaliacoes: 1,
    preco: parseFloat(preco),
    imagem:
      imagem ||
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    disponivel: true,
  };

  docesDatabase.push(novoDoce);
  res.status(201).json({
    status: "success",
    message: "Doce cadastrado com sucesso!",
    data: novoDoce,
  });
});

// 3. DELETE /api/doces/:id - Remover / Inativar um doce do catálogo
app.delete("/api/doces/:id", (req, res) => {
  const id = parseInt(req.params.id);
  docesDatabase = docesDatabase.filter((d) => d.id !== id);
  res.json({
    status: "success",
    message: "Doce removido da vitrine com sucesso.",
  });
});

// Rota fallback para index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(
    `Server Sucrier Atelier rodando na porta http://localhost:${PORT}`,
  );
});
