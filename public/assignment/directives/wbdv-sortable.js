(function() {
    angular
        .module("wbdvDirectives", [])
        .directive("wbdvSortable", wbdvSortable);

    function wbdvSortable() {
        return {
            link: function ($scope, element, attrs) {
                element.sortable({
                    axis: "y",
                    handle: ".wvs-sort-icon"
                });
            }
        };
    }
})();