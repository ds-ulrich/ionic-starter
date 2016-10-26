sv.service('communesService', function( $http, $q ) {
    // Return public API.
    return({
        getCommunes: getCommunes
    });
    // ---
    // PUBLIC METHODS.
    // ---
    // I get all of the friends in the remote collection.
    function getCommunes() {
        var request = $http({
            method: "get",
            url: "assets/data/communes.json",
            params: {
                action: "get"
            }
        });
        return( request.then( handleSuccess, handleError ) );
    }
    // ---
    // PRIVATE METHODS.
    // ---
    // I transform the error response, unwrapping the application dta from
    // the API response payload.
    function handleError( response ) {
        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            ! angular.isObject( response.data ) ||
            ! response.data.message
            ) {
            return( $q.reject( "An unknown error occurred." ) );
        }
        // Otherwise, use expected error message.
        return( $q.reject( response.data.message ) );
    }
    // I transform the successful response, unwrapping the application data
    // from the API response payload.
    function handleSuccess( response ) {
        return( response.data );
    }
});

sv.directive("commune", ['communesService', function (communesService) {
    return {
        restrict: 'E',
        scope:{
        	code: '='
        },
        template: '<p>{{commune.code}} {{commune.commune}}</p>',
        link: function (scope, iElement, iAttrs) {
            communesService.getCommunes()
            .then(function (result) {
            	angular.forEach(result, function(value, key){
            		if(value.code == scope.code) scope.commune = value;
            	});
            });
        }
    };
}]);