angular.module("listaTelefonica").service("operadorasAPI", function($http, config) {
  this.getOperadoras = () => {
    return $http.get(`${config.baseUrl}/operadoras`)
  } 
})