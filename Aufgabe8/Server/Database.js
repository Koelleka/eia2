"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Simple database insertion and query for MongoDB
 * @author: Jirka Dell'Oro-Friedl
 */
var Mongo = require("mongodb");
console.log("Database starting");
var databaseURL = "mongodb://localhost:27017";
var databaseName = "Test";
var db;
var students;
// running on heroku?
if (process.env.NODE_ENV == "production") {
    databaseURL = "mongodb://eia2:Katharina10@ds161518.mlab.com:61518/alpaka";
    //databaseURL = "mongodb://testuser:testpassword@ds129532.mlab.com:29532/eia2";
    databaseName = "alpaka";
}
// try to connect to database, then activate callback "handleConnect" 
Mongo.MongoClient.connect(databaseURL, handleConnect);
// connect-handler receives two standard parameters, an error object and a database object
function handleConnect(_e, _db) {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db.db(databaseName);
        students = db.collection("students");
    }
}
function insert(_doc) {
    // try insertion then activate callback "handleInsert"
    students.insertOne(_doc, handleInsert);
}
exports.insert = insert;
// insertion-handler receives an error object as standard parameter
function handleInsert(_e) {
    console.log("Database insertion returned -> " + _e);
}
// try to fetch all documents from database, then activate callback
function findAll(_callback) {
    // cursor points to the retreived set of documents in memory
    var cursor = students.find();
    // try to convert to array, then activate callback "prepareAnswer"
    cursor.toArray(prepareAnswer);
    // toArray-handler receives two standard parameters, an error object and the array
    // implemented as inner function, so _callback is in scope
    function prepareAnswer(_e, studentArray) {
        if (_e)
            _callback("Error" + _e);
        else
            // stringify creates a json-string, passed it back to _callback
            _callback(JSON.stringify(studentArray));
    }
}
exports.findAll = findAll;
function find(_matrikel, _callback) {
    students.findOne({ "matrikel": _matrikel }, function (_err, _result) {
        if (_err) {
            _callback("Error" + _err);
        }
        else {
            _callback(JSON.stringify(_result));
        }
    });
}
exports.find = find;
//# sourceMappingURL=Database.js.map