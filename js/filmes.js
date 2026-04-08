$(document).ready(function () {

    $("#filme").change(function () {

        let nomeFilme = $(this).val();
        const apiKey = "fa379f87dd4786f7d5081e65b6b8a0d6";  // SOMENTE A CHAVE AQUI

        let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=pt-BR&query=${nomeFilme}`;

        $.get(url, function (data) {

            if (data.results.length === 0) {
                alert("Filme não encontrado!");
                return;
            }

            let filme = data.results[0];

            let imagem = filme.poster_path
                ? "https://image.tmdb.org/t/p/w500" + filme.poster_path
                : "https://via.placeholder.com/300x450?text=Sem+Imagem";

            $("#poster").attr("src", imagem);
            $("#titulo").text(filme.title || "Sem título");
            $("#nota").text(filme.vote_average || "N/A");
            $("#data").text(filme.release_date || "N/A");
            $("#descricao").text(filme.overview || "Sem descrição");

        }).fail(function () {
            alert("Erro na API!");
        });

    });

});