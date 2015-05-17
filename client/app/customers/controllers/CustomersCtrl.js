var app = angular.module('app');

app.controller('CustomersCreateCtrl', ['$scope', '$state', '$modal', '$modalInstance', 'Customer',
  function($scope, $state, $modal, $modalInstance, Customer) {

    $scope.fields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Name'
        }
      },
      {
        key: 'remark',
        type: 'textarea',
        templateOptions: {
          label: 'Remark'
        }
      }
    ];

    $scope.onCancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.onCreate = function() {
      Customer
        .create({
          name: $scope.model.name,
          remark: $scope.model.remark
        })
        .$promise
        .then(function(created) {
          $modalInstance.close();
        });
    };
  }
]);

app.controller('CustomersEditCtrl', ['$scope', '$state', '$modal', '$modalInstance', 'Customer',
  function($scope, $state, $modal, $modalInstance, Customer) {

    $scope.fields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Name'
        }
      },
      {
        key: 'remark',
        type: 'textarea',
        templateOptions: {
          label: 'Remark'
        }
      }
    ];

    $scope.onCancel = function() {
      $modalInstance.dismiss('cancel');
    };

    $scope.onEdit = function() {
      Customer
        .prototype$updateAttributes({
          id: $scope.updateId,
          name: $scope.model.name,
          remark: $scope.model.remark
        })
        .$promise
        .then(function(updated) {
          $modalInstance.close();
        });
    };

    function getCustomer() {
      Customer
        .findOne({
          id: $scope.updateId
        })
        .$promise
        .then(function(customer) {
          $scope.model = customer;
        });
    }
    getCustomer();
  }
]);

app.controller('CustomersCtrl', ['$scope', '$state', '$modal', 'Customer',
  function($scope, $state, $modal, Customer) {

    $scope.openCreate = function() {
      var modalInstance = $modal.open({
        templateUrl: 'views/customers/modals/create.html',
        controller: 'CustomersCreateCtrl',
        scope: $scope
      });

      modalInstance.result.then(function(condition) {
        getCustomers();
      });
    };

    $scope.openEdit = function(customerId) {
      console.log(customerId);
      if (!customerId) {
        alert('Missing customer id.');
        return;
      }

      $scope.updateId = customerId;
      var modalInstance = $modal.open({
        templateUrl: 'views/customers/modals/edit.html',
        controller: 'CustomersEditCtrl',
        scope: $scope
      });

      modalInstance.result.then(function(condition) {
        getCustomers();
      });
    }

    $scope.customers = [];

    function getCustomers() {
      Customer
        .find()
        .$promise
        .then(function(customers) {
          $scope.customers = customers;
        });
    }
    getCustomers();
  }
]);
