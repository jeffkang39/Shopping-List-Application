var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('itemlist', ['itemlist']);
var bodyParser = require('body-parser');
var request = require("request");

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());


app.get('/itemlist', function (req, res) {
  console.log('I received a GET request');

  db.itemlist.find(function (err, docs) {
    console.log("from server1 " +docs);
    res.json(docs);
  });
});

app.post('/itemlist', function (req, res) {
  console.log("from server2 " +req.body);
  db.itemlist.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/itemlist/:id', function (req, res) {
  var id = req.params.id;
  console.log("delete");

  console.log("from server3 " +id);
  db.itemlist.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/itemlist/:id', function (req, res) {
  var id = req.params.id;
  console.log("from server4 " +id);
  db.itemlist.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/itemlist/:id', function (req, res) {
  var id = req.params.id;
  console.log("from server5 " +req.body.name);
  db.itemlist.findAndModify({
    query: {_id: mongojs.ObjectId(id)},

    update: {$set: {item: req.body.item, unit: req.body.unit, quantity: req.body.quantity, tags: req.body.tags, description: req.body.description, price: req.body.price, purchase: req.body.purchase}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

/*db.itemlist.find(function (err, database) {
  console.log("from server2 " +database[0].item);
  var url = "http://item-price.herokuapp.com/get_price?item=" 
  request(url + database[0].item, function(error, response, body) {
  var index = body.indexOf("\"price\"");
  var price = body.slice(index+8,body.length-1);
  database[0].price = price;
  console.log(db.itemlist);
  });

});
//onsole.log(db.itemlist);
request("http://item-price.herokuapp.com/get_price?item=apples", function(error, response, body) {
   // console.log(body);
});*/
app.listen(3000);
console.log("Server running on port 3000");