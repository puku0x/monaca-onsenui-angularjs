(function () {
  'use strict';

  // コントローラ登録
  angular
    .module('app')
    .controller('TodoDetailController', Controller);

  // DI
  Controller.$inject = ['TodoService'];

  // コントローラ
  function Controller(TodoService) {
    var vm = this;

    vm.init = init;
    vm.save = saveTodo;
    vm.delete = deleteTodo;
    vm.todo = null;
    vm.onPopPage = null;

    // 初期化
    function init() {
      var params = nav.topPage.data;
      vm.todo = angular.copy(params.todo);
      vm.onPopPage = params.onPopPage;
    }

    // 保存
    function saveTodo() {
      if (vm.todo.id !== null) {
        update(vm.todo);
      } else {
        create(vm.todo);
      }
    }

    // 登録
    function create(todo) {
      spinner.show();
      TodoService.create(todo).then(function() {
        vm.onPopPage();
        nav.popPage();
      }).finally(function() {
        spinner.hide();
      });
    }

    // 更新
    function update(todo) {
      spinner.show();
      TodoService.update(todo).then(function() {
        vm.onPopPage();
        nav.popPage();
      }).finally(function() {
        spinner.hide();
      });
    }

    // 削除
    function deleteTodo() {
      var labels = ['削除', 'キャンセル'];
      ons.notification.confirm({
        message      : '削除しますか？',
        title        : '確認',
        buttonLabels : labels,
        callback: function(answer) {
          if (answer === labels.indexOf('削除')) {
            spinner.show();
            TodoService.delete(vm.todo.id).then(function() {
              vm.onPopPage();
              nav.popPage();
            }).finally(function() {
              spinner.hide();
            });
          }
        }
      });
    }


  }

}) ();