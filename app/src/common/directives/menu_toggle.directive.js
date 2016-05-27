angular.module('common.services', []);
(function()
{

    'use strict';

    angular.module('common.services')
        .factory('menu', [
      '$location',
      '$rootScope',
      function($location)
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

                var self;

                return self = {
                    sections: sections,

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

angular.module('common.directives', ['common.services']);
angular.module('common.directives')
    .run(['$templateCache', function($templateCache)
        {
            $templateCache.put('partials/menu-toggle.tmpl.html',
                '<md-button class="md-button-toggle" ng-class="{\'toggled\' : isOpen()}"\n' +
                '  ng-click="toggle()"\n' +
                '  aria-controls="docs-menu-{{section.name | nospace}}"\n' +
                '  flex layout="row"\n' +
                '  aria-expanded="{{isOpen()}}">\n' +
                '  {{section.name}}\n' +
                '  <md-icon md-font-set="fa fa-chevron-down" class="md-toggle-icon" ng-class="{\'toggled\' : isOpen()}"></md-icon>' +
                '</md-button>\n' +
                '<ul ng-show="isOpen()" id="docs-menu-{{section.name | nospace}}" class="menu-toggle-list">\n' +
                '  <li ng-repeat="page in section.pages">\n' +
                '    <menu-link section="page"></menu-link>\n' +
                '  </li>\n' +
                '</ul>\n' +
                '');
    }])
    .directive('menuToggle', ['$timeout', function($timeout)
        {
            return {
                scope:
                {
                    section: '='
                },
                templateUrl: 'partials/menu-toggle.tmpl.html',
                link: function(scope, element)
                {
                    var controller = element.parent().controller();

                    scope.isOpen = function()
                    {
                        return controller.isOpen(scope.section);
                    };
                    scope.toggle = function()
                    {
                        controller.toggleOpen(scope.section);
                    };

                    var parentNode = element[0].parentNode.parentNode.parentNode;
                    if (parentNode.classList.contains('parent-list-item'))
                    {
                        var heading = parentNode.querySelector('h2');
                        element[0].firstChild.setAttribute('aria-describedby', heading.id);
                    }
                }
            };
    }]);

(function()
{
    'use strict';

    angular.module('common.directives')
        .run(['$templateCache', function($templateCache)
            {
                $templateCache.put('partials/menu-link.tmpl.html',
                    '<md-button ng-class="{\'{{section.icon}}\' : true}" \n' +
                    '  ui-sref-active="active" ui-sref="{{section.state}}" ng-click="focusSection()">\n' +
                    '  {{section | humanizeDoc}}\n' +
                    '  <span class="md-visually-hidden "\n' +
                    '    ng-if="isSelected()">\n' +
                    '    current page\n' +
                    '  </span>\n' +
                    '</md-button>\n' +
                    '');
    }])
        .directive('menuLink', function()
        {
            return {
                scope:
                {
                    section: '='
                },
                templateUrl: 'partials/menu-link.tmpl.html',
                link: function($scope, $element)
                {
                    var controller = $element.parent().controller();

                    $scope.focusSection = function()
                    {
                        // set flag to be used later when
                        // $locationChangeSuccess calls openPage()
                        controller.autoFocusContent = true;
                    };
                }
            };
        })
})();


angular.module('myMenuApp.controllers', ['common.directives']);
(function()
{
    'use strict';

    angular.module('myMenuApp.controllers')

    .controller('HomeCtrl', [
      '$rootScope',
      '$log',
      '$state',
      '$timeout',
      '$location',
      'menu',
      function($rootScope, $log, $state, $timeout, $location, menu)
        {

            var vm = this;
            var aboutMeArr = ['Family', 'Location', 'Lifestyle'];
            var budgetArr = ['Housing', 'LivingExpenses', 'Healthcare', 'Travel'];
            var incomeArr = ['SocialSecurity', 'Savings', 'Pension', 'PartTimeJob'];
            var advancedArr = ['Assumptions', 'BudgetGraph', 'AccountBalanceGraph', 'IncomeBalanceGraph'];

            //functions for menu-link and menu-toggle
            vm.isOpen = isOpen;
            vm.toggleOpen = toggleOpen;
            vm.autoFocusContent = false;
            vm.menu = menu;

            vm.status = {
                isFirstOpen: true,
                isFirstDisabled: false
            };

            function isOpen(section)
            {
                return menu.isSectionSelected(section);
            }

            function toggleOpen(section)
            {
                menu.toggleSelectSection(section);
            }

      }]);
})();