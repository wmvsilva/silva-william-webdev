(function() {
    angular
        .module("wbdvDirectives", [])
        .directive("wbdvSortable", wbdvSortable);

    function wbdvSortable() {
        var initial;
        var final;
        return {
            scope: {
                sortWidgetCallback: '&'
            },
            link: function (scope, element, attrs) {
                element.sortable({
                    axis: "y",
                    handle: ".wvs-sort-icon",
                    start: function(event, ui) {
                        initial = ui.item.index();
                    },
                    stop: function(event, ui) {
                        final = ui.item.index();
                        scope.sortWidgetCallback({
                            initial: initial,
                            final: final
                        });
                    }
                });
            }
        };
    }
})();