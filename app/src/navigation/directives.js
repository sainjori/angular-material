angular.module('navigation.directives', ['navigation.services']);
angular.module('navigation.directives')
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

    angular.module('navigation.directives')
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
        .directive('menuLink', function($mdSidenav)
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
                        $mdSidenav('left').toggle();
                        // set flag to be used later when
                        // $locationChangeSuccess calls openPage()
                        controller.autoFocusContent = true;
                    };
                }
            };
        })
})();