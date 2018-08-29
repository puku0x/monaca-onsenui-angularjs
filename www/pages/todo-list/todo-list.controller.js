(function () {
  'use strict';

  // コントローラ登録
  angular
    .module('app')
    .controller('TodoListController', Controller);

  // DI
  Controller.$inject = ['TodoService'];

  // コントローラ
  function Controller(TodoService) {
    var vm = this;

    vm.init = init;
    vm.add = addTodo;
    vm.edit = editTodo;
    vm.todos = [];

    // 初期化
    function init() {
      loadTodos();
    }

    // 一覧読み込み
    function loadTodos() {
      spinner.show();
      TodoService.findAll().then(function(todos) {
        vm.todos = todos;
      }).finally(function() {
        spinner.hide();
      });
    }

    // 追加
    function addTodo() {
      var todo = {
        id: null,
        text: ''
      };
      editTodo(todo);
    }

    // 編集
    function editTodo(todo) {
      var options = {
        data: {
          todo: todo,
          onPopPage: loadTodos,
        }
      }
      nav.pushPage('pages/todo-detail/todo-detail.html', options);
    }
  }

}) ();