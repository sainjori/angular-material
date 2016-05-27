angular.module('navigation', ['navigation.directives']);
(function()
{
    'use strict';

    angular.module('navigation')

    .controller('HomeCtrl', [
      '$rootScope',
      '$log',
      '$state',
      '$timeout',
      '$location',
      'menu', '$scope',
      function($rootScope, $log, $state, $timeout, $location, menu, $scope)
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
            // menu.getMenus().then(function(result)
            // {
            //     // body...
            //     vm.menu = result;
            //     console.log(vm.menu);
            // });
            vm.menu = menu;
            menu.getMenus().then(function(result)
            {
                $scope.sections = result;
            })

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