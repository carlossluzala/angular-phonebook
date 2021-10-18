app.controller("listaTelefonicaCtrl", function($scope, contatosAPI, operadorasAPI, serialGenerator){
  $scope.app = "Lista Telefônica"
  $scope.contatos = []
  $scope.operadoras = []
  var carregarContatos = function() {
    contatosAPI.getContatos()
    .then(({data}) => {
      $scope.contatos = data
    })
    .catch(error => {
      $scope.message = "Aconteceu um problema: " + JSON.stringify(error.status)
    })
  }
  var carregarOperadoras = function() {
    operadorasAPI.getOperadoras().then(({data}) => {
      $scope.operadoras = data
    })
  }

  carregarContatos()
  carregarOperadoras()

  console.log(serialGenerator.generate())

  
  $scope.adicionarContato = function (contato) {
    contato.serial = serialGenerator.generate()
    contatosAPI.saveContato(contato).then(() => {
      delete $scope.contato
      $scope.contatoForm.$setPristine()
      carregarContatos()
    });
  }
  $scope.apagarContatos = function (contatos) {
    $scope.contatos = contatos.filter( function(contato) {
      return !contato.selecionado
    })
    
  }
  $scope.isContatoSelecionado = function (contatos) {
    return contatos.some(function(contato) {
      return contato.selecionado
    })
  }
  $scope.ordenarPor = function (campo) {
    $scope.criterioDeOrdenacao = campo
    $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao
  }
})