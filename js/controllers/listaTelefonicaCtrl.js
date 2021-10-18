app.controller("listaTelefonicaCtrl", function($scope, $http){
  $scope.app = "Lista Telefônica"
  $scope.contatos = []
  $scope.operadoras = []
  var carregarContatos = function() {
    $http.get("http://localhost:3001/contatos")
    .then(({data}) => {
      $scope.contatos = data
    })
    .catch(error => {
      $scope.message = "Aconteceu um problema: " + JSON.stringify(error.status)
    })
  }
  var carregarOperadoras = function() {
    $http.get("http://localhost:3001/operadoras").then(({data}) => {
      $scope.operadoras = data
    })
  }

  carregarContatos()
  carregarOperadoras()
  
  $scope.adicionarContato = function (contato) {
    $http.post("http://localhost:3001/contatos", contato).then(({ data }) => {
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