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

## Usage

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

##Screen Shots
###Date Picker
<img src="https://lh3.googleusercontent.com/PUOkcnwlfdGez5LI34gpup8Y_U2pz1_e45PwVNZg_f35RgRS_rHYuQ74xUw3lGPogm482SUNzF2oIGQ=w1920-h939" width="320" height="568" />
<img src="https://lh5.googleusercontent.com/rxuE1CUT746FCp7RVgShToSAK9L2ida1thmLs09KZhUTVPrtnO8_-Hkpn643J6hDxgCVd0Dx5ORp8gs=w1920-h939" width="320" height="568" />
<img src="https://lh5.googleusercontent.com/TOPMDEQT6xEZKCvg8x-tmTFTkrta5rsln5KRHSJC8QRR4fpnICAwOXHWypIDEyqMcNBWu0YzTvAh5Vw=w1920-h939" width="320" height="568" />
###Time Picker
<img src="https://lh4.googleusercontent.com/BaWtrRjKRNMDoJUzFmO8oVYpjEC2MwhZGltBNozh_FZBimqDKE2x9ZqAxXRGbGZd7JAcz0kQ0wme0k4=w1920-h939" width="320" height="568" />
<img src="https://lh3.googleusercontent.com/wLe6neg5v_PC8ltegEgH-vzGODMgtv1Ncsj3bqkjOi8Xqc5Z96irPvTHfjcemsFDohNOr2BFtxS9JzE=w1920-h939" width="320" height="568" />
<img src="https://lh4.googleusercontent.com/j6DdyEJQcWHiMqlTZpfPXKjdMOnnLom_Vza1Zm0nBSclfMtxyscVGKJyYI4T6pxRVNKZM0-oJsqgX9c=w1920-h939" width="320" height="568" />
