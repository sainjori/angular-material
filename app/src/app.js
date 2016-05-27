angular.module('MaterialApp', ['ngMaterial', 'users', 'ngMdIcons', 'myMenuApp.controllers',
    'ngAnimate',
    'ui.router',
    'ngAria'])
    .config(function($mdIconProvider, $mdThemingProvider)
    {
        $mdThemingProvider.definePalette('amazingPaletteName',
        {
            '50': '#e4eef7',
            '100': '#e4eef7',
            '200': '#e4eef7',
            '300': '#e57373',
            '400': '#ef5350',
            '500': '007aca',
            '600': '007aca',
            '700': '007aca',
            '800': '#e4eef7',
            '900': '007aca',
            'A100': '#ff8a80',
            'A200': '#ff5252',
            'A400': '#ff1744',
            'A700': '#d50000',
            'contrastDefaultColor': 'light', // whether, by default, text (contrast)
            // on this palette should be dark or light
            'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
     '200', '300', '400', 'A100'],
            'contrastLightColors': undefined // could also specify this if default was 'dark'
        });
        $mdThemingProvider.theme('default')
            .primaryPalette('amazingPaletteName')
        $mdIconProvider.icon("share", "./assets/svg/share.svg", 24);
        $mdIconProvider.icon("menu", "./assets/svg/menu.svg", 24);
        $mdIconProvider.icon("search", "./assets/svg/ic_search_black_24px.svg", 24);
        $mdIconProvider.defaultIconSet("./assets/svg/avatars.svg", 128);
    }).config(['$stateProvider', '$urlRouterProvider', '$logProvider',
    function($stateProvider, $urlRouterProvider)
        {

            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('home',
                {
                    url: '/',

                    views:
                    {

                        '@':
                        {
                            templateUrl: 'src/partials/home.view.html',
                            controller: 'HomeCtrl as vm'
                        }
                    }
                })
                .state('home.beers',
                {
                    url: 'beers',
                    abstract: true
                })
                .state('home.beers.ipas',
                {
                    url: '/ipas',

                    views:
                    {

                        'content@home':
                        {
                            templateUrl: 'beers.ipa.view.html'
                        }
                    }
                })
                .state('home.beers.porters',
                {
                    url: '/porters',

                    views:
                    {

                        'content@home':
                        {
                            templateUrl: 'beers.porters.view.html'
                        }
                    }
                })
                .state('home.beers.wheat',
                {
                    url: '/wheat',

                    views:
                    {

                        'content@home':
                        {
                            templateUrl: 'beers.wheat.view.html'
                        }
                    }
                })
    }])
    //take all whitespace out of string
    .filter('nospace', function()
    {
        return function(value)
        {
            return (!value) ? '' : value.replace(/ /g, '');
        };
    })
    //replace uppercase to regular case
    .filter('humanizeDoc', function()
    {
        return function(doc)
        {
            if (!doc) return;
            if (doc.type === 'directive')
            {
                return doc.name.replace(/([A-Z])/g, function($1)
                {
                    return '-' + $1.toLowerCase();
                });
            }

            return doc.label || doc.name;
        };
    });