var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

// Connection URL
const url = 'mongodb://<dbuser>:<dbpassword>@dsxxxxxx.mlab.com:portnumb/dbname';

// Database Name
const dbName = 'dbname';

//Body Parser is used to parse the incomeing request.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cors is used to allow all domain
app.use(cors());

//Get method is used to fetch the data from database.
app.get("/", (req, res, next) => {
    //Connecting the mongodb
    MongoClient.connect(url,{ useNewUrlParser: true }, function (err, client) {
        //If connection failed the it will go to if condition.
        if (err) {
            res.send(JSON.stringify(err));
            res.end();
        }
        const db = client.db(dbName);
        //Fectching the data
        db.collection('students').find().toArray(function (err, result) {
            if (err) {
                res.write("fetching  students failed");
                res.end();
            } else {

                res.send(JSON.stringify(result));
            }
        });
    });
});

//Post method is used to add the student in the database.
app.post("/create", (req, res, next) => {
    //Connecting to database
    MongoClient.connect(url, { useNewUrlParser: true },function (err, client) {
        //If connection failed the it will go to if condition.
        if (err) {
            res.write("connecting to Database failed");
            res.end();
        }
        const db = client.db(dbName);
        console.log(req.body);
        //Inserting the record in the database.
        db.collection('students').insertOne(req.body, function (err, result) {
            if (err) {
                res.send("Registration Failed, Error While Registering "+err);
                res.end();
            }
            res.send("Inserted a document into the students collection.");
        });
    });
});

//Updating the record in the database using id.
app.put("/update/:id", (req, res, next) => {
    //Connecting to database
    MongoClient.connect(url, { useNewUrlParser: true },function (err, client) {
        //If connection failed the it will go to if condition.
        if (err) {
            res.send("connecting to Database failed");
            res.end();
        }
        const db = client.db(dbName);
        console.log(req.body);
        //Updating the record using id.
        db.collection('students').updateOne({_id:ObjectId( req.params.id)},{ $set: req.body }, function (err, result) {
            if (err) {
                res.send("Error while updating"+err);
                res.end();
            }
            res.send("Updated");
        });
    });
});


//Deleting the record in the database using id.
app.delete("/delete/:id", (req, res, next) => {
     //Connecting to database
    MongoClient.connect(url, { useNewUrlParser: true },function (err, client) {
        //If connection failed the it will go to if condition.
        if (err) {
            res.send("connecting to Database failed");
            res.end();
        }
        const db = client.db(dbName);
        console.log(req.params.id);
        //Deleteing the record.
        db.collection('students').deleteOne({_id:ObjectId( req.params.id)}, function (err, result) {
            if (err) {
                res.send("Error while deleting : "+err);
                res.end();
            }
            res.send("Deleted");
        });
    });
});

//Get method is used to fetch the data from database.
app.get("/search", (req, res, next) => {
    console.log(req.query);
    //Connecting the mongodb
    MongoClient.connect(url,{ useNewUrlParser: true }, function (err, client) {
        //If connection failed the it will go to if condition.
        if (err) {
            res.send(JSON.stringify(err));
            res.end();
        }
        const db = client.db(dbName);
        var searchString = {};
        searchString[req.query["search"]] ={ $eq:  req.query["term"] } ;
        console.log(searchString);
        //Fectching the data
        db.collection('students').find(searchString).toArray(function (err, result) {
            if (err) {
                res.write("fetching  students failed");
                res.end();
            } else {

                res.send(JSON.stringify(result));
            }
        });
    });
});

//Created the node server adn listing at port 3001 
app.listen("3001", () => {
    console.log("localhost:3001");
});