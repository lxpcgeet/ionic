


//angular 有两种方法来创建服务  
// 一、服务  二、工厂 也就是这里的factory  定义一个工厂之后可以给这个工厂分配方法
//如果使用服务的话 可以自定义服务 然后给这个服务添加方法即可
angular.module('todo',['ionic'])
	.factory('Projects',function(){//添加服务  定义方法
		return {
			all:function(){
				var projectString = window.localStorage['projects'];//定义一个localStroage下边的数组
				if( projectString ){
					return angular.fromJson(projectString);//如果projects这个字符串存在 将其转换为数组的形式
				}
				return [];//如果这个对象不存在的话 返回空数组
			},
			save:function(projects){
				window.localStorage['projects'] = angular.toJson(projects);//将projects 转换为字符串重新保存
			},
			newProject:function(projectTitle){//新添加的project 返回一个标题  和 对应的 tasks数据
				return {
					title:projectTitle,
					tasks:[]
				}
			},
			getLastActiveIndex:function(){//得到lastActiveProject 这个数据，猜测应该是projects对应的下标
				return parseInt(window.localStorage['lastActiveProject']) || 0;
			},
			setLastActiveIndex:function(index){//重置lastActiveProject 下标
				window.localStorage['lastActiveProject'] = index;
			}
			
		}
	})
	//控制器 注入各种服务  自定义的服务可以不带$
	//$ionicModal 模态窗口 可以遮住用户主界面的内容框  用户引入<script id='new-task.html' type="text/ng-template">模板
	//ionicSideMenuDelegate 所有的菜单控制器 下面有好多的方法
	.controller('TodoCtrl',function($scope,$timeout,$ionicModal,Projects,$ionicSideMenuDelegate){
		//创造一个project这样的项目
		var createProject = function(projectTitle){//传入 projectTitle 这个新建project的标题
			var newProject = Projects.newProject(projectTitle);//调用 newPeoject函数 生成对应的数据
			$scope.projects.push(newProject);//将新生成的数据存储到localstroge中
			//Projects里边定义的一个服务
			Projects.save($scope.projects);
			$scope.selectProject(newProject,$scope.projects.length-1);
		}

		$scope.projects = Projects.all();//返回 projectString 这个数组  展示左侧菜单的数据

		$scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];//调用函数  获取初始化数据

		$scope.newProject = function(){
			var projectTitle = prompt('Project name');//弹出一个框
			if( projectTitle ){
				createProject(projectTitle);//如果存在  创建project的一个项
			}
		}
		//选中新添加的这个project 在侧边栏
		$scope.selectProject = function(project,index){
			$scope.activeProject = project;//新建的project 赋值给$scope.activeProject 最近的数据展示在中心内容上
			Projects.setLastActiveIndex(index);//设置下标 index为新建的project的下标
			$ionicSideMenuDelegate.toggleLeft(false);//此时关闭左侧菜单
		}
		//浮动框下边的方法fromTemplateUrl 后边的函数是初始化选项
		$ionicModal.fromTemplateUrl('new-task.html',function(modal){//设置可以覆盖主页面内容的模板
			$scope.taskModal = modal
		},{
			scope:$scope,
			animation:'slide-in-up'//动画
		})

		$scope.createTask = function(task){//创建 新的task
			if( !$scope.activeProject || !task ){
				return;
			}
			$scope.activeProject.tasks.push({
				title:task.title
			});
			$scope.taskModal.hide();
			//Projects里边的一个服务
			Projects.save($scope.projects);
			task.title = '';
		}

		$scope.newTask = function(){//显示这个模块
			$scope.taskModal.show();
		}

		$scope.closeNewTask = function(){//隐藏这个模块
			$scope.taskModal.hide();
		}

		$scope.toggleProjects = function(){
			$ionicSideMenuDelegate.toggleLeft();//显示左侧菜单
		}

		$timeout(function(){//开启定时器
			if( $scope.projects.length == 0 ){//当projects这个数组是空的时候 弹出弹框 要求创建projects数据
				while(true){
					var projectTitle = prompt('your first project title');//prompt显示用户可进行输入的对话框 返回的是输入的值
					if( projectTitle ){//如果这个值存在了
						createProject(projectTitle);//利用这个值 创建一个project
						break;
					}
				}
			}
		})

	})