var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");
/*
function getJSONP(url, success) {
  console.log(url);
    var ud = '_' + +new Date,
        script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0] 
               || document.documentElement;
    window[ud] = function(data) {
        head.removeChild(script);
        success && success(data);
    };
    console.log(typeof url);
    script.src = url;
    head.appendChild(script);
};
getJSONP("http://item-price.herokuapp.com/get_price?item=cat", function(data){
    console.log(data);
});
*/
//$.ajax({ url: 'http://item-price.herokuapp.com/get_price?item=cat', success: function(data) { console.log(data); } });  
/*
$http.get("http://item-price.herokuapp.com/get_price?item=apples").
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    console.log("hello");
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
       console.log("error");
  });*/

//HELPER FUNCTIONS
var refresh = function() {
  $http.get('/itemlist').success(function(response) {
    //console.log("I got the data I requested");
    $scope.itemlist = response;
    //console.log("response " +response);
    //console.log("$scope.itemlist " +response);
    $scope.item = "";
  });
};

refresh();

var changeP = function(x){
   console.log(x);
  if (document.getElementById('checkboxID').checked){ //checks the check box to see if it has already been purchased or not
        x.purchased = "Purchased";
      }
      else{
        x.purchased = "Not Purchased";
      }   
}
var getObject = function(id){ //gets the index of the item in the itemlist

  for(i = 0; i < $scope.itemlist.length; i++){

    //console.log($scope.itemlist[i]._id);
    if(id == $scope.itemlist[i]._id)
      return i;
  }
}
$scope.debug = function() {
    console.log("_________________________________")
  for(i = 0; i <$scope.itemlist.length;i++){
    console.log($scope.itemlist[i]);
  }
    }

//END OF HELPER FUNCTIONS
$scope.additem = function() {
  changeP($scope.item);
  $http.post('/itemlist', $scope.item).success(function(response) {         
    //console.log(response);
    refresh();
  });  
  refresh();
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/itemlist/' + id).success(function(response) {
    refresh();
  });
};

$scope.clearSort = function(id) {
  
  $http.get('/itemlist').success(function(response) { 
  });
};
$scope.purchase = function(id) {
    //console.log($scope.itemlist);
    var index = getObject(id);
    var tempId = id;
    $scope.itemlist[index].purchased = "Purchased";
    $scope.itemlist[index];
    //console.log($scope.itemlist[index]);

    $http.delete('/itemlist/' + id).success(function(response) {
    });   
    $scope.item._id = tempId;
    $http.post('/itemlist', $scope.itemlist[index]).success(function(response) {         
   
  });

};


$scope.sortByPurchased = function() {
  $http.get('/itemlist').success(function(response) { //response holds all the objects
    for(i = 0; i < $scope.itemlist.length ; i++){
        console.log($scope.itemlist[i].purchased + " " +i);
        console.log($scope.itemlist[i]);
      if ($scope.itemlist[i].purchased.contains("Not Purchased")){
          
          $scope.itemlist[i].item = null;
          $scope.itemlist[i].unit = null;
          $scope.itemlist[i].quantity = null;
          $scope.itemlist[i].tags = null;
          $scope.itemlist[i].item = null;
          $scope.itemlist[i].description = null;
          $scope.itemlist[i].price = null;
          $scope.itemlist[i].purchased = null;

      }          
    }

  });
};
$scope.sortByTag = function() {
    var x = document.getElementById('tagbox').value;
      console.log(x);
    $http.get('/itemlist').success(function(response) { //response holds all the objects
    for(i = 0; i < response.length ; i++){
     
      if (String($scope.itemlist[i].tags) == x){
        //tag has been found
        console.log("");
        }
      else{
         $scope.itemlist[i].item = null;
          $scope.itemlist[i].unit = null;
          $scope.itemlist[i].quantity = null;
          $scope.itemlist[i].tags = null;
          $scope.itemlist[i].item = null;
          $scope.itemlist[i].description = null;
          $scope.itemlist[i].price = null;
          $scope.itemlist[i].purchased = null;
      }         
    }

    });
    
};


$scope.totalprice = function() {
  //console.log($scope.item);
  var totalPriceOfItems = 0;
  $http.get('/itemlist').success(function(response) { //response holds all the objects
    
    for(i=0; i<response.length; i++){
        totalPriceOfItems =  totalPriceOfItems + parseFloat(response[i].price);
    }
    console.log("price = " + totalPriceOfItems);
    var x = document.getElementsByName("totalPriceBox");
    console.log(x);
      x[0].value = "$"+ totalPriceOfItems;
  });
};

$scope.currentprice = function(){
  var currentPriceOfItems = 0;
  $http.get('/itemlist').success(function(response) { //response holds all the objects
    
    for(i=0; i<response.length; i++){

        if($scope.itemlist[i].purchased == "Purchased"){
          currentPriceOfItems =  currentPriceOfItems + parseFloat(response[i].price);
        }
    }

    var x = document.getElementsByName("currentPriceBox");
    console.log(x);
      x[0].value = "$"+ currentPriceOfItems;
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/itemlist/' + id).success(function(response) {
    //response.price="5";
    $scope.item = response;
  });
};  

$scope.update = function() {
  console.log($scope.item._id);
  $http.put('/itemlist/' + $scope.item._id, $scope.item).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.item = "";
}

}]);﻿

