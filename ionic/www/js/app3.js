

angular.module('todo',['ionic'])
    .factory('Fun',function($location){
        return {
            clickFun:function(){
                console.log( 44444 )
                $location.href="www.baidu.com";
            }
        }
    })
    .controller('TodoCtrl',function($scope,$location,Fun){
        $scope.clickFun = function(){
            Fun.clickFun();
        }
    })