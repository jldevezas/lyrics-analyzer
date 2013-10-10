'use strict';

var app = angular.module('lyricsAnalyzerApp', []);

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl : 'home.partial.html'
	}).when('/upload', {
		templateUrl : 'upload.partial.html'
	}).when('/analyze', {
		templateUrl : 'analyze.partial.html'
	}).when('/about', {
		templateUrl : 'about.partial.html'
	}).when('/contact', {
		templateUrl : 'contact.partial.html'
	}).otherwise({
		redirectTo : '/home'
	});
} ]);