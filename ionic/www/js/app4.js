/**
 * Created by adm on 2017/4/1.
 */

angular.module('todo',[])
  .controller('TodoCtrl',['$scope',function($scope){
        $scope.nums = 1;
        $scope.aFn = function(num){
            $scope.nums = num;
        }
  }])
