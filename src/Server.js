const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const app = express();
app.use(express.json());
app.get('/api/users/show_all', function (req, res) {
  MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      const db = client.db("Reports");
      const collection = db.collection('repo_card');
      collection.find().toArray((err, items) => {
          if (err) throw err;
          res.send(items);
      });
  });
});


app.get('/api/users/show_all/:value', function (req, res) {
  MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      const db = client.db("Reports");
      const collection = db.collection('repo_card');
      // const recentsearchcollection = db.collection('recentsearchlist');
      // recentsearchcollection.insertOne({ value: req.params.value});
      // recentsearchcollection.find().toArray((err,items)=>{
      //   if(err) throw err;
      //   res.send(items);
      // });
      collection.find({ $or: [ {title: { $regex: req.params.value}},
      {description: {$regex: req.params.value}} ] }).toArray((err,items)=>{
        res.send(items);
      });
  });
});
   
// app.post('/api/users/show_all/fetch_data', function(req,res){
//   console.log(req.body);
//   MongoClient.connect(url, function (err, client) {
//       if (err) throw err;
//       const db = client.db("Users");
//       const collection = db.collection('List');
//       collection.insertOne({ id: req.body.id,
//                           title: req.body.title,
//                           description: req.body.description,
//                           publishDate: req.body.publishedDate,
//                           cost: req.body.cost}, (err, result) => {
//                           })
//   });
// });

app.listen(3001);

