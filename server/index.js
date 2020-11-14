const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');


// Create tables if they doesn't already exist
db.serialize(function () {
    db.run('CREATE TABLE IF NOT EXISTS password_user (user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name TEXT, user_first_name TEXT, user_last_name TEXT, user_password TEXT)')
    db.run('CREATE TABLE IF NOT EXISTS password_group (group_id INTEGER PRIMARY KEY AUTOINCREMENT, group_name TEXT, group_description TEXT, user_id INTEGER, FOREIGN KEY(user_id) REFERENCES password_user(user_id))')
    db.run('CREATE TABLE IF NOT EXISTS password (password_id INTEGER PRIMARY KEY AUTOINCREMENT, password_text TEXT, password_application TEXT, password_description TEXT, group_id INTEGER, FOREIGN KEY(group_id) REFERENCES password_group(group_id))')
})

const app = express()

/*
    GET : Select
    POST : Insert
    PUT : Update
    DELETE : Delete
 */

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8674")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  });

// Get all users
app.get('/user', function(req,res){
    db.all("SELECT user_id, user_name, user_first_name, user_last_name, user_password FROM password_user", function(err, row) {
        if (err === null) {
            res.status(200)
            res.send(row)
        }
        else {
            res.status(404)
            res.send()
        }
    })
})

// Get a specific user
app.get('/user/:id', function(req,res) {
    db.all("SELECT user_name, user_first_name, user_last_name, user_password FROM password_user WHERE user_id = " + req.params.id, function (err, row) {
        if (err === null) {
            res.status(200)
            res.send(row)
        }
        else {
            res.status(404)
            res.send()
        }
    })
})

// Indicate if a user in the database
app.get('/user/in/:user_name/:user_password', function(req, res) {
    db.all("SELECT user_id FROM password_user WHERE user_name = \"" + req.params.user_name + "\" AND user_password = \"" + req.params.user_password + "\"", function(err, row){
        if (err === null) {
            res.status(200)
            res.send(row)
        }
        else {
            res.status(404)
            res.send("Error")
        }
    })
})

// Add a user
app.post('/user/:name/:first_name/:last_name/:password', function (req, res){
    let sql = "INSERT INTO password_user(user_name, user_first_name, user_last_name, user_password) VALUES (\"" + req.params.name + "\",\"" + req.params.first_name + "\",\"" + req.params.last_name + "\",\"" + req.params.password + "\")"
    db.exec(sql)
    res.status(200)
    res.send()
})

// Modify a user
app.put('/user/:id/:name/:first_name/:last_name/:password', function (req, res){
    let sql = "UPDATE password_user SET user_name = \"" + req.params.name + "\",user_first_name = \"" + req.params.first_name + "\", user_last_name = \"" + req.params.last_name + "\", user_password = \"" + req.params.password + "\" WHERE user_id = " + req.params.id
    db.exec(sql)
    res.status(200)
    res.send()
})

// Delete a user
app.delete('/user/:id', function(req, res){
    let sql = "DELETE from password_user WHERE user_id = " + req.params.id
    db.exec(sql)
    res.status(200)
    res.send()
})

// Select all the groups in the database
app.get('/group', function(req,res){
    let sql = "SELECT group_id, group_name, group_description, user_id from password_group"
    db.all(sql, function (error, result) {
      if (error === null) {
          res.status(200)
          res.send(result)
      }
      else {
          res.status(404)
          res.send()
      }
    })
})

// Select a specific group
app.get('/group/:id_group', function (req, res) {
    let sql = "SELECT group_id, group_name, group_description, user_id from password group WHERE group_id = " + req.params.id_group
    db.all(sql, function (error, result) {
        if (error === null) {
            res.status(200)
            res.send(result)
        }
        else {
            res.status(404)
            res.send()
        }
    })
})

// Select all groups from a user
app.get('/group/user/:id_user', function (req, res) {
    let sql = "SELECT group_id, group_name, group_description, user_id from password_group WHERE user_id = " + req.params.id_user
    db.all(sql, function (error, result) {
        if (error === null) {
            res.status(200)
            res.send(result)
        }
        else {
            res.status(404)
            res.send()
        }
    })
})

app.post('/group/:name/:description/:id_user', function (req,res){
    let sql = "INSERT INTO password_group (group_name, group_description, user_id) VALUES (\"" + req.params.name + "\", \"" + req.params.description + "\", " + req.params.id_user + ")"
    db.exec(sql, function (error){
        if (error===null){
            res.status(200)
            res.send()
        }
        else {
            res.status(404)
            res.send()
        }
    })
})

app.put('/group/:id/:name/:description/:user', function (req, res){
    let sql = "UPDATE password_group SET group_name = \"" + req.params.name + "\", group_description = \"" + req.params.description + "\", user_id = " + req.params.user + " WHERE group_id = " + req.params.id
    db.exec(sql, function (error){
        if (error===null){
            res.status(200)
            res.send()
        }
        else {
            res.status(404)
            res.send()
        }
    })
})

app.delete('/group/:id', function (req, res){
    let sql = "DELETE FROM password_group WHERE group_id = " + req.params.id
    db.exec(sql, function (error){
        if (error===null){
            res.status(200)
            res.send()
        }
        else {
            res.status(404)
            res.send()
        }
    })
})

app.get('/password', function(req, res){
    let sql = "SELECT password_id, password_text, password_application, password_description, group_id FROM password"
    db.all(sql,function(err, rows){
        if (err===null){
            res.status(200)
            res.send(rows)
        }
        else {
            res.status(404)
            res.send()
        }
    })
})

app.get('/password/:id', function(req,res){
    let sql = "SELECT password_text, password_application, password_description, group_id FROM password WHERE password_id = " + req.params.id
    db.all(sql,function(err, rows){
        if (err===null){
            res.status(200)
            res.send(rows)
        }
        else {
            res.status(404)
            res.send()
        }
    })
})

app.get('/password/group/:id_group', function(req, res){
    let sql = "SELECT password_id, password_text, password_application, password_description FROM password WHERE group_id = " + req.params.id_group
    db.all(sql,function(err, rows){
        if (err===null){
            res.status(200)
            res.send(rows)
        }
        else {
            res.status(404)
            res.send()
        }
    })
})

app.post('/password/:name/:application/:description/:id_group', function(req, res){
    let sql = "INSERT INTO password(password_text, password_application, password_description, group_id) VALUES (\"" + req.params.name + "\", \""+ req.params.application + "\", \"" + req.params.description + "\", " + req.params.id_group  +")"
    db.exec(sql, function(err){
        if (err === null) {
            res.status(200)
        }
        else {
            res.status(404)
        }
        res.send()
    })
})

app.put('/password/:id_password/:name/:application/:description/:id_group', function(req, res) {
    let sql = "UPDATE password SET password_text = \"" + req.params.name + "\", password_application = \"" + req.params.application + "\", password_description = " + req.params.description + "\", group_id = " + req.params.id_group + " WHERE password_id = " + req.params.id_password
    db.exec(sql, function(err){
        if (err === null) {
            res.status(200)
        }
        else {
            res.status(404)
        }
        res.send()
    })
})

app.delete('/password/:id', function(req,res) {
    let sql = "DELETE FROM password WHERE password_id = " + req.params.id
    db.exec(sql, function(err){
        if (err === null) {
            res.status(200)
        }
        else {
            res.status(404)
        }
        res.send()
    })
})

console.log('Server listening on port 8673')
app.listen(8673)
