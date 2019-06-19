// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
};
  
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
};

var orm = {
    selectAll: function(table, callback) {
        var query = "SELECT * FROM " + table + ";";

        connection.query(query, function(err, res) {
            if (err) {
                throw err;
            }
            callback(res);
        });
    },

    insertOne: function(table, cols, vals, callback) {
        var query = "INSERT INTO " + table + " (" + cols.toString() + ") " + "VALUES (" + printQuestionMarks(vals.length) + ") ";

        console.log(query);

        connection.query(query, vals, function(err, res) {
            if (err) {
                throw err;
            }
            callback(res);
        });
    },

    updateOne: function(table, objColVals, condition, callback) {
        var query = "UPDATE " + table +  " SET " + objToSql(objColVals) + " WHERE " + condition;

        console.log(query);

        connection.query(query, function(err, res) {
            if (err) {
                throw err;
            }
            callback(res);
        });
    },

    deleteOne: function(table, condition, callback) {
        var query = "DELETE FROM " + table + " WHERE " + condition;

        console.log(query);

        connection.query(query, function(err, res) {
            if (err) {
                throw err;
            }
            callback(res);
        });
    }
};
module.exports = orm;