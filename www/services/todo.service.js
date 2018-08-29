(function() {
  'use strict';

  // DI
  Service.$inject = ['$http'];

  // サービス登録
  angular.module('app').factory('TodoService', Service);

  // サービス
  function Service($http) {
    // APIのURL
    var baseUrl = 'https://us-central1-todo-api-4119c.cloudfunctions.net/v1/todos';

    return {
      'findAll': findAllTodos,
      'find':    findTodo,
      'create':  createTodo,
      'update':  updateTodo,
      'delete':  deleteTodo,
    };

    // 一覧取得
    function findAllTodos(offset, limit) {
      var url = baseUrl;
      return $http.get(url).then(function(response) {
        return response.data;
      });
    }

    // 取得
    function findTodo(id) {
      var url = baseUrl + '/' + id;
      return $http.get(url).then(function(response) {
        return response.data;
      });
    }

    // 登録
    function createTodo(todo) {
      var url = baseUrl;
      return $http.post(url, todo).then(function(response) {
        return response.data;
      });
    }

    // 更新
    function updateTodo(todo) {
      var url = baseUrl + '/' + todo.id;
      return $http.put(url, todo).then(function(response) {
        return response.data;
      });
    }

    // 削除
    function deleteTodo(id) {
      var url = baseUrl + '/' + id;
      return $http.delete(url).then(function(response) {
        return response.data;
      });
    }
  }
})();