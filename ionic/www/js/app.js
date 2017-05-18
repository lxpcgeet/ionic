

angular.module('todo',['ionic'])
    .controller('TodoCtrl',function($scope,$ionicModal){
        $scope.tasks = [
          {title:'菜鸟教程'},
          {title:'www.runoob.com'},
          {title:'菜鸟教程'},
          {title:'www.runoob.com'},
        ];

        //创建并载入模型  载入模型不懂
        $ionicModal.fromTemplateUrl('new-task.html',function(modal){
            $scope.taskModal = modal;
        },{
            scope:$scope,
            animation:'slide-in-up'
        })

        //表单提交时调用
        $scope.createTask = function(task){
            $scope.tasks.push({//给tasks数据添加数据
                title:task.title
            });
            $scope.taskModal.hide();//隐藏添加的页面
            task.title="";//清楚input里边的数据
        }
        //打开新增的模型
        $scope.newTask = function(){
            $scope.taskModal.show();//显示增加的页面
        }
        //关闭新增模型
        $scope.closeNewTask = function(){
            $scope.taskModal.hide();//隐藏增加的页面
        }


    })