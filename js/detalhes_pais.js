/*
$.getJSON("https://restcountries.com/v3.1/name/venezuela", function (data) {
  console.log(data[0].altSpellings[0]);
  console.log(data[0].altSpellings[3]);
  console.log(data[0].capital[0]);
  console.log(data[0].subregion);
  console.log(data[0].population);
  console.log(data[0].independent);
  console.log(data[0].currencies.VES.name);
  console.log(data[0].flags.png);
});
*/

$(document).ready(function () {
  $("#detalhes_pais").on("change", function () {
    const detalhes_pais = $(this).val();

    $.getJSON(
      `https://restcountries.com/v3.1/name/${detalhes_pais}/`,
      function (data) {
        if (!("erro" in data)) {
          $("#sigla").text(data[0].altSpellings[0]);
          $("#nome").text(data[0].altSpellings[2]);
          $("#capital").text(data[0].capital[0]);
          $("#regiao").text(data[0].subregion);
          $("#populacao").text(data[0].population.toLocaleString("pt-BR"));
          $("#independente").prop(
            "checked",
            Boolean(data[0].independent)
          );
          $("#bandeira").attr("src", data[0].flags.png);

          alert(
            "País: " +
              data[0].altSpellings[2] +
              "\nSigla: " +
              data[0].altSpellings[0] +
              "\nCapital: " +
              data[0].capital[0] +
              "\nRegião: " +
              data[0].subregion +
              "\nPopulação: " +
              data[0].population +
              "\nIndependente: " +
              data[0].independent +
              "\nBandeira: " +
              data[0].flags.png
          );
        } else {
          alert("País não encontrado.");
          limparCampos();
        }
      }
    ).fail(function () {
      alert("Erro ao consultar País.");
      limparCampos();
    });
  });

  function limparCampos() {
    $("#rua, #bairro, #cidade, #estado").val("");
  }
});
