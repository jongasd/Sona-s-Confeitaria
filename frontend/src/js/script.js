
const doces = [
  {
    id: 1,
    nome: "Fleur de Vanille & Pistache",
    categoria: "bolos",
    imagem: "src/img/Fleur de Vanille & Pistache.png",
    tag: "Signature",
    descricao: "Cremoso de pistache de Bronte & framboesas frescas",
    rendimento: "12 a 15 fatias",
    preco: 380.0,
  },
  {
    id: 2,
    nome: "Red Velvet Clássico",
    categoria: "bolos",
    imagem: "src/img/Red Velvet Clássico.png",
    tag: "Clássico",
    descricao: "Massa aveludada com cream cheese e baunilha bourbon",
    rendimento: "10 a 12 fatias",
    preco: 260.0,
  },
  {
    id: 3,
    nome: "Caixa Trufas Sortidas",
    categoria: "caixas",
    imagem: "src/img/Caixa Trufas Sortidas.png",
    tag: "Presente",
    descricao: "12 trufas artesanais em quatro sabores autorais",
    rendimento: "Caixa com 12 un.",
    preco: 120.0,
  },
  {
    id: 4,
    nome: "Coffret Macarons",
    categoria: "caixas",
    imagem: "src/img/Coffret Macarons.png",
    tag: "Edição Limitada",
    descricao: "Macarons franceses em sabores sazonais",
    rendimento: "Caixa com 9 un.",
    preco: 95.0,
  },
  {
    id: 5,
    nome: "Tarte au Citron",
    categoria: "sobremesas",
    imagem: "src/img/Tarte au Citron.png",
    tag: "Individual",
    descricao: "Massa amanteigada, creme de limão siciliano e merengue",
    rendimento: "Porção individual",
    preco: 32.0,
  },
  {
    id: 6,
    nome: "Mousse de Chocolate 70%",
    categoria: "sobremesas",
    imagem: "src/img/Mousse de Chocolate.png",
    tag: "Novo",
    descricao: "Chocolate belga 70% cacau com flor de sal",
    rendimento: "Porção individual",
    preco: 28.0,
  },
];

let carrinhoCount = 0;

function formatarPreco(valor) {
  return valor.toFixed(2).replace(".", ",");
}

function renderizarVitrine(categoria = "todos") {
  const grid = document.getElementById("doces-grid");
  const lista =
    categoria === "todos"
      ? doces
      : doces.filter((d) => d.categoria === categoria);

  if (lista.length === 0) {
    grid.innerHTML = `
      <div class="col-12 text-center py-5 text-muted">
        <p class="mb-0">Nenhum doce cadastrado nesta categoria no momento.</p>
      </div>`;
    return;
  }

  grid.innerHTML = lista
    .map(
      (doce) => `
      <div class="col-12 col-md-6 col-lg-4">
        <div class="card h-100 border-0 shadow-sm card-hover">
          <img
            src="${doce.imagem}"
            class="card-img-top"
            alt="${doce.nome}"
            style="height: 260px; object-fit: cover"
          />
          <div class="card-body d-flex flex-column">
            <span class="badge bg-atelier-secondary text-dark align-self-start mb-2">${doce.tag}</span>
            <h3 class="font-serif h5 text-atelier-primary">${doce.nome}</h3>
            <p class="text-muted small mb-2">${doce.descricao}</p>
            <p class="text-muted small mb-3">${doce.rendimento}</p>

            <div class="mt-auto pt-3 border-top">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <small class="text-muted">Preço</small>
                <span class="font-serif h5 text-atelier-primary fw-bold mb-0">R$ ${formatarPreco(doce.preco)}</span>
              </div>
              <button
                class="btn btn-atelier-primary w-100"
                onclick="adicionarAoCarrinho(${doce.id})"
              >
                Adicionar ao Pedido
              </button>
            </div>
          </div>
        </div>
      </div>`,
    )
    .join("");
}

function adicionarAoCarrinho(id) {
  carrinhoCount++;
  document.getElementById("cartCount").innerText = carrinhoCount;
}

document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    document.querySelectorAll(".filter-btn").forEach((b) => {
      b.classList.remove("btn-atelier-primary", "active");
      b.classList.add("btn-outline-secondary");
    });

    e.target.classList.remove("btn-outline-secondary");
    e.target.classList.add("btn-atelier-primary", "active");

    renderizarVitrine(e.target.getAttribute("data-categoria"));
  });
});

document.addEventListener("DOMContentLoaded", () => {
  renderizarVitrine();
});
