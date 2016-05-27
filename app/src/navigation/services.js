angular.module('navigation.services', []);
(function()
{

    'use strict';

    angular.module('navigation.services')
        .factory('menu', [
      '$location',
      '$http',
      '$q',
      '$rootScope',
      function($location, $http, $q)
            {

                var sections = [
                    {
                        name: 'Getting Started',
                        state: 'home.gettingstarted',
                        type: 'link'
                }];

                sections.push(
                {
                    name: 'Stammdaten',
                    type: 'toggle',
                    pages: [
                        {
                            name: 'Organisations-Struktur',
                            type: 'link',
                            state: 'home.beers.ipas',
                            icon: 'fa fa-group'
                },
                        {
                            name: 'Parameter',
                            state: 'home.beers.porters',
                            type: 'link',
                            icon: 'fa fa-map-marker'
                },
                        {
                            name: 'Wheat',
                            state: 'home.beers.wheat',
                            type: 'link',
                            icon: 'fa fa-plus'
                  }]
                });

                sections.push(
                {
                    name: 'Benutzerverwaltung',
                    type: 'toggle',
                    pages: [
                        {
                            name: 'Benutzer',
                            type: 'link',
                            state: 'munchies.cheetos',
                            icon: 'fa fa-group'
                },
                        {
                            name: 'Rollen',
                            state: 'munchies.bananachips',
                            type: 'link',
                            icon: 'fa fa-map-marker'
                }]
                });


                var URLS = {
                        FETCH: 'src/common/models/menu.json'
                    },
                    sectionsHttp;

                function extract(result)
                {
                    return result.data;
                }

                function cacheMenus(result)
                {
                    console.log(result);
                    sectionsHttp = extract(result);
                    console.log(sections);
                    return sectionsHttp;
                }


                var getMenus = function()
                {
                    return (sectionsHttp) ? $q.when(sectionsHttp) : $http.get(URLS.FETCH).then(cacheMenus);
                };

                var self;

                return self = {
                    sections: sections,
                    getMenus: getMenus,

                    toggleSelectSection: function(section)
                    {

                        self.openedSection = (self.openedSection === section ? null : section);
                    },
                    isSectionSelected: function(section)
                    {
                        return self.openedSection === section;
                    },
                    selectPage: function(section, page)
                    {

                        page && page.url && $location.path(page.url);
                        self.currentSection = section;
                        self.currentPage = page;
                    }
                };

                function sortByHumanName(a, b)
                {
                    return (a.humanName < b.humanName) ? -1 :
                        (a.humanName > b.humanName) ? 1 : 0;
                }

      }]);

})();