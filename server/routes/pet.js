var express = require('express');
var router = express.Router();

var pool = require('../modules/pool');

router.get('/', function (req, res) {
    console.log('in pet get');
    // Attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!!!
            // Now, we're going to GET things from thd DB
            client.query(`SELECT * FROM pets
            LEFT OUTER JOIN owners
            ON owners.id = pets.owner_id;`,
             function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    // Query failed. Did you test it in Postico?
                    // Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }
            });
        }
    });
});

router.post('/', function (req, res) {
    console.log('in pet post');
    // Attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!!!
            // Now, we're going to GET things from thd DB
            client.query(`INSERT INTO pets ("name", breed, color,owner_id)
            VALUES ($1, $2, $3, $4);`, [ req.body.name, req.body.breed, req.body.color, req.body.owner_id], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    // Query failed. Did you test it in Postico?
                    // Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
        }
    });
});

module.exports = router