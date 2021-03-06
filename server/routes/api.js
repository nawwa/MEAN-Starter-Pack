const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;



// Connect
const connection = (closure) => {
    return MongoClient.connect('mongodb://localhost:27017/mean', (err, client) => {
        if (err) return console.log(err);
        closure(client);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};


// Get users
router.get('/users', (req, res) => {
    connection((client) => {
        var db = client.db('mean');
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                console.log(users);
                response.data = users;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
                client.close();
            });
    });
});

// Post a user
router.post('/user', (req, res) => {
    connection((client) => {
        var db = client.db('mean');
        db.collection("users")
            .insertOne(req.body)
            .then((result) => {
                response.data = result;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
                client.close();
            });
    });
});

module.exports = router;