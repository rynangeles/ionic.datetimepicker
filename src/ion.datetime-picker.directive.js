'use strict';

(function() {
	function ionicDateTimePickerDirective($ionicPopup, moment){
        var templates = {
            year: 'ionic-date-time-picker/template/year.html',
            month: 'ionic-date-time-picker/template/month.html',
            date: 'ionic-date-time-picker/template/date.html',
            time: 'ionic-date-time-picker/template/time.html',
            hours: 'ionic-date-time-picker/template/hours.html',
            minutes: 'ionic-date-time-picker/template/minutes.html'
        };
		
		function Link(scope, element, attrs, ngModelCtrl){
            var modes = ['date', 'time'];
            var mode = attrs.mode ? attrs.mode : 'date';
            var today = moment();
            var calendar = {};
            
            scope.days = moment.weekdaysShort;
            scope.months = moment.monthsShort();
            scope.calendar = calendar;
            scope.templates = templates;
            scope.today = today;
            scope.changeMonth = changeMonth;
            scope.changeTemplate = changeTemplate;
            scope.changeYearSet = changeYearSet;
            scope.selectTimeByMeridiem = selectTimeByMeridiem;
            scope.selectDate = selectDate;
            scope.selectMonth = selectMonth;
            scope.selectYear = selectYear;
            scope.selectHours = selectHours;
            scope.selectMinutes = selectMinutes;
            
            function changeYearSet(year, direction){
                calendar.years = [];
                var low = (year + direction) < year ? (year + direction) : year;
                var high = (year + direction) > year ? (year + direction) : year;
                
                for (var yr = low; yr <= high; yr++) {
                    calendar.years.push(yr);
                }
                
            }
            
            function changeTemplate(template){
                scope.template = template;
            }
            
            function changeMonth(direction){
                calendar.base = moment(calendar.base).add(direction, 'month').startOf('month');
                _setCalendar(calendar.base);
            }
            
            function selectDate(date){
                calendar.selected = date;
                calendar.base = date;
            }
            
            function selectMonth(month){
                calendar.selected = calendar.selected.month(month);
                calendar.base = calendar.selected;
                _setCalendar(calendar.base);
                changeTemplate('date');
            }
            
            function selectYear(year){
                calendar.selected = calendar.selected.year(year);
                calendar.base = calendar.selected;
                _setCalendar(calendar.base);
                changeTemplate('month');
            }
            
            function selectHours(hours){
                calendar.selected.hours(hours);
                changeTemplate('time');
            }
            
            function selectMinutes(minutes){
                calendar.selected.minutes(minutes);
                changeTemplate('time');
            }
            
            function selectTimeByMeridiem(meridiem){
                calendar.selected.hours(calendar.selected.hours() + (meridiem === 'am' ? 12 : -12));
            }
            
            function openDatePicker(e){
                e.preventDefault();
                
                calendar.selected = moment(ngModelCtrl.$viewValue);
                calendar.base = calendar.selected;
                
                _setCalendar(calendar.base);
                
                changeTemplate(mode);
                
                changeYearSet(calendar.selected.year(), 11);
                
                $ionicPopup.confirm({
                    title: '',
                    cssClass: 'date-time-picker',
                    templateUrl: 'ionic-date-time-picker/template/picker.html',
                    scope: scope,
                    buttons: [{ 
                        text: 'Cancel',
                        type: 'button-default'
                    }, {
                        text: 'OK',
                        type: 'button-positive',
                        onTap: function() {
                            _setModel(calendar.selected.toDate());
                        }
                    }]
                })
                .then(function (res) {
                    if(res) {
                        
                    }
                });
            }
            
			function _setModel(date){
				ngModelCtrl.$setViewValue(date || moment().toDate());
				ngModelCtrl.$render();
				
			}
            
            function _setCalendar(date){
                var start = moment(date).startOf('month').startOf('week').startOf('day');
                var end = moment(date).endOf('month').endOf('week').endOf('day');
                var range = moment.range(start, end);
                
                calendar.month = moment(date).month();
                calendar.monthly = range.toArray('weeks').map(function(day){
                     return moment.range(day, moment(day).endOf('week')).toArray('days');
                });
                
            }
            
            if(modes.indexOf(mode) < 0){
                console.warn('Use `date` or `time` as mode attribute for `date-time-picker` directive. Setting mode to `date`');
                mode = 'date';
            }
            
            if(ngModelCtrl && typeof ngModelCtrl.$viewValue === 'undefined'){
                _setModel();
			}
			
			element.on('click', openDatePicker);
		}
		
		return {
			restrict: 'EA',
			link: Link,
			require: '?ngModel',
            scope: {}
		};
	}
    
    function ionDateTimePickerTemplates ($templateCache) {
		$templateCache.put('ionic-date-time-picker/template/picker.html', '<div ng-include="templates[template]" ng-class="template"></div>');
        
        $templateCache.put('ionic-date-time-picker/template/date.html',
            '<div class="controls-container">' + 
                '<button class="button-prev icon ion-chevron-left" ng-click="changeMonth(-1)"></button>' +
                '<button class="button-header" ng-click="changeTemplate(\'month\')">{{calendar.base | amDateFormat: \'MMMM YYYY\'}}</button>' +
                '<button class="button-next icon ion-chevron-right" ng-click="changeMonth(1)"></button>' +
            '</div>' + 
            '<div class="week-days-container">' +
                '<ul class="week-days"><li class="name" ng-repeat="name in days()">{{::name}}</li></ul>' +
            '</div>' + 
            '<div class="month-container">' +
                '<ul class="week" ng-repeat="weekly in calendar.monthly">' + 
                    '<li class="day" ng-class="{today: daily.isSame(today, \'day\'), selected: daily.isSame(calendar.selected, \'day\')}" ng-repeat="daily in weekly">' +
                        '<button ng-click="selectDate(daily)" ng-disabled="daily.month() !== calendar.month">{{daily | amDateFormat: \'DD\'}}</button>' +
                    '</li>' +
                '</ul>' +
			'</div>'
		);
        $templateCache.put('ionic-date-time-picker/template/month.html',
            '<div class="controls-container">' + 
                '<button class="button-header" ng-click="changeTemplate(\'year\')">{{calendar.base | amDateFormat: \'YYYY\'}}</button>' +
            '</div>' + 
            '<div class="month-names-container">' +
                '<ul class="month-names">' +
                    '<li class="name" ng-repeat="name in months">' +
                        '<button class="button button-small" ng-class="$index === calendar.month ? \'button-positive\' : \'button-stable\'" ng-click="selectMonth($index)">{{name}}</button>' +
                    '</li>' +
                '</ul>' +
            '</div>'
		);
        
        $templateCache.put('ionic-date-time-picker/template/year.html',
            '<div class="controls-container">' + 
                '<button class="button-prev icon ion-chevron-left" ng-click="changeYearSet((calendar.years[0] - 1), -11)"></button>' +
                '<button class="button-header">{{calendar.years[0] + \' - \' + calendar.years[11]}}</button>' +
                '<button class="button-next icon ion-chevron-right" ng-click="changeYearSet((calendar.years[11] + 1), 11)"></button>' +
            '</div>' + 
            '<div class="years-container">' +
                '<ul class="years">' +
                    '<li class="year" ng-repeat="year in calendar.years">' +
                        '<button class="button button-small" ng-class="calendar.selected.year() === year ? \'button-positive\' : \'button-stable\'" ng-click="selectYear(year)">{{year}}</button>' +
                    '</li>' +
                '</ul>' +
            '</div>'
		);
        
        $templateCache.put('ionic-date-time-picker/template/time.html',
            '<div class="time-container">' +
                '<div class="box hours">' +
                    '<button class="button-up icon ion-chevron-up" ng-click="selectHours(calendar.selected.hours() + 1)"></button>' + 
                    '<button class="button button-stable" ng-click="changeTemplate(\'hours\')">{{calendar.selected | amDateFormat : \'hh\'}}</button>' + 
                    '<button class="button-down icon ion-chevron-down" ng-click="selectHours(calendar.selected.hours() - 1)"></button>' + 
                '</div>' +
                '<div class="box separator">:</div>' +
                '<div class="box minutes">' +
                    '<button class="button-up icon ion-chevron-up" ng-click="selectMinutes(calendar.selected.minutes() + 1)"></button>' + 
                    '<button class="button button-stable" ng-click="changeTemplate(\'minutes\')">{{calendar.selected | amDateFormat : \'mm\'}}</button>' + 
                    '<button class="button-down icon ion-chevron-down" ng-click="selectMinutes(calendar.selected.minutes() - 1)"></button>' + 
                '</div>' +
                '<div class="box meridiem">' +
                    '<button class="button button-stable" ng-click="selectTimeByMeridiem(calendar.selected.format(\'a\'))">{{calendar.selected | amDateFormat : \'a\'}}</button>' + 
                '</div>' +
            '</div>'
		);
        
        $templateCache.put('ionic-date-time-picker/template/hours.html',
            '<div class="hours-container">' +
                '<ul class="hours">' +
                    '<li class="name" ng-repeat="hour in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]">' +
                        '<button class="button button-small" ng-class="((\'0\' + hour).slice(-2) === calendar.selected.format(\'hh\')) ? \'button-positive\' : \'button-stable\'" ng-click="selectHours(hour)">{{(\'0\' + hour).slice(-2)}}</button>' +
                    '</li>' +
                '</ul>' +
            '</div>'
		);
        
        $templateCache.put('ionic-date-time-picker/template/minutes.html',
            '<div class="minutes-container">' +
                '<ul class="minutes">' +
                    '<li class="name" ng-repeat="minute in [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]">' +
                        '<button class="button button-small" ng-class="((\'0\' + minute).slice(-2) === calendar.selected.format(\'mm\')) ? \'button-positive\' : \'button-stable\'" ng-click="selectMinutes(minute)">{{(\'0\' + minute).slice(-2)}}</button>' +
                    '</li>' +
                '</ul>' +
            '</div>'
		);
    }

    angular.module('ion.datetime-picker.directive', [])
    
    .run(ionDateTimePickerTemplates)
	
	.directive('ionDateTimePicker', ionicDateTimePickerDirective);
	
})(); 