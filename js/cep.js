$(document).ready(function () {
  $("#cep").on("blur", function () {
    //qdo a caixa perde o foco
    // Verifica se o campo de CEP está vazio
    const cep = $(this).val().replace(/\D/g, ""); // Remove caracteres não numéricos

    // Verifica se o CEP tem 8 dígitos
    // Se o CEP não for vazio e tiver 8 dígitos, faz a requisição
    if (cep.length === 8) {
      //https://viacep.com.br/ws/13304640/json/ para teste
      $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function (data) {
        if (!("erro" in data)) {
          $("#rua").val(data.logradouro);
          $("#bairro").val(data.bairro);
          $("#cidade").val(data.localidade);
          $("#estado").val(data.uf);
        } else {
          alert("CEP não encontrado.");
          limparCampos();
        }
      }).fail(function () {
        alert("Erro ao consultar o CEP.");
        limparCampos();
      });
    } else {
      alert("CEP inválido.");
      limparCampos();
    }
  });

  function limparCampos() {
    $("#rua, #bairro, #cidade, #estado").val("");
  }
});
