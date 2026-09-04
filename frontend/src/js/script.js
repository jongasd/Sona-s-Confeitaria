class Doce {
  constructor(nome, preco, categoria, descricao) {
    this.nome = nome;
    this.preco = preco;
    this.categoria = categoria;
    this.descricao = descricao;
  }

  formatarPreco() {
    return `R$ ${this.preco.toFixed(2).replace(".", ",")}`;
  }
}

const vitrine = [
  new Doce(
    "Fatia de Red Velvet",
    18.5,
    "Bolos",
    "Massa aveludada com toque de cacau e recheio de cream cheese original.",
  ),
  new Doce(
    "Brigadeiro Gourmet",
    4.5,
    "Docinhos",
    "Feito com chocolate belga 54% e granulado de chocolate puro.",
  ),
  new Doce(
    "Macaron de Pistache",
    7.0,
    "Macarons",
    "Clássico doce francês recheado com ganache cremosa de pistache.",
  ),
];

const containerVitrine = document.querySelector("#vitrine");

function criarCardDoce(doce) {
  const col = document.createElement("div");
  col.className = "col-12 col-md-6 col-lg-4 mb-4"; 

  const card = document.createElement("article");
  card.className = "card-doce card h-100 shadow-sm border-0"; 
  card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title fw-bold" style="color: #d81b60;">${doce.nome}</h5>
        <p class="card-text text-muted mb-2">${doce.categoria}</p>
        <p class="card-text fs-5 fw-bold text-success">${doce.formatarPreco()}</p>
      </div>
      <div class="card-footer bg-transparent border-top-0 pb-3">
        <button class="btn btn-outline-danger w-100"
                data-bs-toggle="modal"
                data-bs-target="#modalDoce"
                data-nome="${doce.nome}"
                data-categoria="${doce.categoria}"
                data-preco="${doce.formatarPreco()}"
                data-descricao="${doce.descricao}">
          Ver detalhes
        </button>
      </div>
    `;

  col.appendChild(card);
  return col;
}

function renderizarVitrine() {
  if (!containerVitrine) return; 
  containerVitrine.innerHTML = "";
  vitrine.forEach((doce) => {
    containerVitrine.appendChild(criarCardDoce(doce));
  });
}

renderizarVitrine();

document.addEventListener("show.bs.modal", (event) => {
  const btn = event.relatedTarget;
  if (!btn) return;

  document.getElementById("modalNome").textContent =
    btn.getAttribute("data-nome");
  document.getElementById("modalCategoria").textContent =
    btn.getAttribute("data-categoria");
  document.getElementById("modalPreco").textContent =
    btn.getAttribute("data-preco");
  document.getElementById("modalDescricao").textContent =
    btn.getAttribute("data-descricao");
});
