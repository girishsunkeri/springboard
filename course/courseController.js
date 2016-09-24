(function () {
    var injectParams = ['$scope', 'courseService', '$filter','$timeout'];


    var courseController = function ($scope, courseService, $filter, $timeout) {

        $scope.currentCourseIndex = 0;
        $scope.allCoursesServer = [];
        $scope.allCourses = [];
        $scope.searchTagInput = "";
        $scope.filterValue= "up";

        $scope.course = {
            id: 0,
            name: '',
            image: '',
            tags: '',
            learner: 0,
            hours: 0,
            description: '',
            sign_up: ''
        };

        $('.back').click(function(){
            $(".course-info-cnt").css("display", "none");
            $(".course-list-cnt").css("display", "inline-block").css("width","100%");
        })

        getAllCourses();

        function initCurrentCourse(){
            if($scope.currentCourseIndex < $scope.allCourses.length){
                $scope.course = angular.copy($scope.allCourses[$scope.currentCourseIndex]);
                $scope.course.tags = $scope.course.tags.split(',');
                $scope.course.upvotes = courseService.getUpvotes($scope.course.id);
                $scope.course.downvotes = courseService.getDownvotes($scope.course.id);
            }
        }

        function getAllCourses(){
            courseService.getAllCoursesData()
            .then(function(allCourses){
                console.log('In controller');
                console.log(allCourses);
                $scope.allCoursesServer = allCourses;
                $scope.allCourses = allCourses;
                initCurrentCourse();

                $timeout(function () {
                    $('.course-indiv').click(function(){
                        if($(".course-info-cnt").css("display") == 'none'){
                            $(".course-info-cnt").css("display", "inline-block");
                            $(".course-list-cnt").css("display", "none");
                        }
                    });
                }, 500);

            }, function(error){

            });
        }

        $scope.$watch('searchTagInput', function(newValue, oldValue) {

            if(newValue == ""){
                $scope.allCourses = $scope.allCoursesServer.slice();
            }else{
                $scope.allCourses = $filter('filter')($scope.allCoursesServer,function(value){
                    return value.tags.toString().toLowerCase().indexOf(newValue.toString().toLowerCase()) > -1;
                });
            }

            console.log("After filtering");
            console.log($scope.allCourses);
            $scope.currentCourseIndex = 0;
            initCurrentCourse();
        });

        $scope.displayCourse = function(index){
            $scope.currentCourseIndex = index;
            initCurrentCourse();
        }

        $scope.upvote = function(courseId){
            courseService.upvote(courseId);
            $scope.course.upvotes += 1;
        }

        $scope.downvote = function(courseId){
            courseService.downvote(courseId);
            $scope.course.downvotes += 1;
        }

    };

    courseController.$inject = injectParams;
    
    angular.module('springboard').controller('courseController', courseController);
}());