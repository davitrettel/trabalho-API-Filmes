$("#formCurriculo").validate({
  rules: {
    nome: {
      required: true,
      minlength: 5
    },
    email: {
      required: true,
      email: true
    },
    idade: {
      required: true,
      min: 18,
      max: 65
    },
    senha: {
      required: true,
      minlength: 6
    },
    confirmar: {
      required: true,
      equalTo: "#senha"
    }
  }
});

