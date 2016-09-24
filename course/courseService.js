(function () {
    var injectParams = ['$http', '$q', '$filter'];
    var courseFactory = function ($http, $q, $filter) {

        var factory = {};
        
        factory.getAllCoursesData = function(){
            console.log("inside getAllCoursesData");
            return $http.get("https://hackerearth.0x10.info/api/learning-paths?type=json&query=list_paths").then(function(response) {
                console.log("GOT COURSE DATA");
                console.log(response.data.paths);
                return response.data.paths;
            }, function(error){
                console.log("Error getting course data: ");
                console.log(error)
            });

        }

        factory.getUpvotes = function(courseId){
            allVotes = localStorage.getItem('allVotes');
            if(allVotes !== null){
                allVotes = JSON.parse(allVotes);
                voteDetail= $filter('filter')(allVotes,function(value){
                    return value.id == courseId;
                });

                if(voteDetail.length > 0){
                    return voteDetail[0].upvote;
                }else{
                    return 0;
                }
            }else{
                return 0 ;
            }
        }

        factory.getDownvotes = function(courseId){
            allVotes = localStorage.getItem('allVotes');
            if(allVotes !== null){
                allVotes = JSON.parse(allVotes);
                voteDetail= $filter('filter')(allVotes,function(value){
                    return value.id == courseId;
                });

                if(voteDetail.length > 0){
                    return voteDetail[0].downvote;
                }else{
                    return 0;
                }
            }else{
                return 0 ;
            }
        }

        factory.upvote = function(courseId){
            allVotes = localStorage.getItem('allVotes');
            if(allVotes !== null){
                allVotes = JSON.parse(allVotes);
                voteDetail= $filter('filter')(allVotes,function(value){
                    return value.id == courseId;
                });

                if(voteDetail.length > 0){
                    voteDetail[0].upvote += 1;
                }else{
                    allVotes.push({ id: courseId, upvote: 1, downvote: 0 });
                }
            }else{
                allVotes = [];
                allVotes.push({ id: courseId, upvote: 1, downvote: 0 });
            }   


            localStorage.setItem('allVotes', JSON.stringify(allVotes));
        }

        factory.downvote = function(courseId){
            allVotes = localStorage.getItem('allVotes');
            if(allVotes !== null){
                allVotes = JSON.parse(allVotes);
                voteDetail= $filter('filter')(allVotes,function(value){
                    return value.id == courseId;
                });

                if(voteDetail.length > 0){
                    voteDetail[0].downvote += 1;
                }else{
                    allVotes.push({ id: courseId, upvote: 0, downvote: 1 });
                }
            }else{
                allVotes = [];
                allVotes.push({ id: courseId, upvote: 0, downvote: 1 });
            }   


            localStorage.setItem('allVotes', JSON.stringify(allVotes));
        }

        

        return factory;
    };

    courseFactory.$inject = injectParams;

    angular.module('springboard').factory('courseService', courseFactory);

}());