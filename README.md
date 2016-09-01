# ion.datetime-picker

> Date and time picker for ionic framework

## Getting Started

```shell
bower install ion.datetime-picker --save
```

````html
<link rel="stylesheet" href="bower_components/ion.datetime-picker/dist/ion.datetime-picker.min.css" />
<script src="bower_components/ion.datetime-picker/dist/ion.datetime-picker.min.js"></script>
````

````javascript
// Inject ion.datetime-picker to main module
angular.module('app', ['ionic', 'ion.datetime-picker']){
//
}
````

````javascript
.controller('Ctrl', function($scope, moment){
	$scope.date = moment().toDate(); // Date Object
	$scope.time = moment().toDate(); // Date Object
});
````

````html
<div class="list">
	<div class="item">
	    <div class="row">
	        <a class="col-67" ion-date-time-picker ng-model="activity.date">
	            <label>Date</label>
	            <h2>{{date | amDateFormat : 'ddd, DD MMMM YYYY' }}</h2>
	        </a>
	        <a class="col-33" ion-date-time-picker ng-model="activity.time" mode="time">
	            <label>Time</label>
	            <h2>{{time | amDateFormat : 'hh:mm a' }}</h2>
	        </a>
	    </div>
	</div>
</div>
````