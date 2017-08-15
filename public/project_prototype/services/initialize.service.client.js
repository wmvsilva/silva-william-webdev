(function () {
    angular
        .module("tmdbApp")
        .service("InitializeService", InitializeService);

    function InitializeService(UserService, $location) {

        this.initialize = initialize;

        function initialize(model, controller, arguments) {
            var paramArr = getParamNames(controller);
            var argObj = createArgObject(paramArr, arguments);
            if (argObj.user) {
                model.userId = argObj.user._id;
                model.user = argObj.user;
            }

            model.logout = logout;
        }

        function logout(){
            UserService
                .logout()
                .then(function (response) {
                    $location.url("/login");
                });
        }

        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        function getParamNames(func) {
            var fnStr = func.toString().replace(STRIP_COMMENTS, '');
            var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
            if(result === null)
                result = [];
            return result;
        }

        function createArgObject(paramArr, valueArr) {
            var result = {};
            for (var p in paramArr) {
                var param = paramArr[p];
                var value = valueArr[p];
                result[param] = value;
            }
            return result;
        }
    }
})();