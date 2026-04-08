$(function () {

  /*
localStorage é um recurso do navegador que permite armazenar dados no próprio computador dousuário, de forma persistente.

localStorage = “banco de dados do navegador”
Guarda informações no navegador
Os dados não somem ao fechar a página
Ficam salvos até serem apagados manualmente

✅ Armazena dados em formato texto (string)
✅ Capacidade de ~5MB por site
✅ Persistente (não expira sozinho)
  */

  // 🔹 Pega lista do localStorage
  const get = () => JSON.parse(localStorage.getItem("produtos")) || [];

  // 🔹 Salva lista no localStorage
  const set = (lista) => localStorage.setItem("produtos", JSON.stringify(lista));

  // 🔹 Mostra produtos na tabela
  function carregar() {
    let html = "";
    //p indica cada produto, i é o índice (posição) do produto na lista
    get().forEach((p, i) => {
      html += `
        <tr>
          <td>${p.nome}</td>
          <td>R$ ${Number(p.preco).toFixed(2)}</td>
          <td>
            <!-- botão editar -->
            <button class="editar btn btn-warning btn-sm" data-i="${i}">Editar</button>
            <!-- botão excluir -->
            <button class="excluir btn btn-danger btn-sm" data-i="${i}">Excluir</button>
          </td>
        </tr>`;
    });

    $("#tabelaProdutos").html(html); // joga na tabela
  }

  // 🔹 Salvar (novo ou edição)
  $("#formProduto").submit(function (e) {
    e.preventDefault(); // evita recarregar

    let nome = $("#nome").val(); // pega nome
    let preco = $("#preco").val(); // pega preço
    let i = $("#indiceEdicao").val(); // índice (se estiver editando)
    let lista = get(); // pega lista atual

    if (!nome || !preco) return; // validação simples

    if (i === "") {
      lista.push({ nome, preco }); // adiciona novo
    } else {
      lista[i] = { nome, preco }; // atualiza existente
      $("#indiceEdicao").val(""); // limpa edição

      // volta botão para salvar
      $("#salvar").text("Salvar").removeClass("btn-primary").addClass("btn-success");
    }

    set(lista); // salva no localStorage
    this.reset(); // limpa formulário
    carregar(); // atualiza tabela
  });

  // 🔹 Excluir produto
  $(document).on("click", ".excluir", function () {
    let i = $(this).data("i"); // pega índice
    let lista = get();

    lista.splice(i, 1); // remove item
    set(lista); // salva
    carregar(); // atualiza tela
  });

  // 🔹 Editar produto
  $(document).on("click", ".editar", function () {
    let i = $(this).data("i"); // pega índice
    let p = get()[i]; // pega produto

    // joga valores no formulário
    $("#nome").val(p.nome);
    $("#preco").val(p.preco);
    $("#indiceEdicao").val(i);

    // muda botão para atualizar
    $("#salvar").text("Atualizar").removeClass("btn-success").addClass("btn-primary");
  });

  carregar(); // carrega ao iniciar
});