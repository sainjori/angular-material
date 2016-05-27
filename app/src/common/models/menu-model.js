angular.module('MaterialApp')
    .service('NavigationModelService', function($http, $q)
    {

        var model = this,
            URLS = {
                FETCH: 'src/common/models/menu.json'
            },
            menus;

        function extract(result)
        {

            return result.data;
        }

        function cacheMenus(result)
        {
            menus = extract(result);
            return menus;
        }


        model.getMenus = function()
        {
            return (menus) ? $q.when(menus) : $http.get(URLS.FETCH).then(cacheMenus);
        };


    })