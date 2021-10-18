angular.module("listaTelefonica").factory("contatosAPI", ($http, config) => {
  var _getContatos = () => {
    return $http.get(`${config.baseUrl}/contatos`)
  }

  var _saveContato = (contato) => {
    return $http.post(`${config.baseUrl}/contatos`, contato)
  }

  return {
    getContatos: _getContatos,
    saveContato: _saveContato,
  }
})