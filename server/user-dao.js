'use strict'

const db = require('./db');


const bcrypt= require('bcrypt')

// getting user by id

exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Users WHERE id = ?';
        db.query(sql, [id], (err, row) => {
          if (err) 
            reject(err);
          else if (row === undefined)
            resolve({error: 'User not found.'});
          else {
            // by default, the local strategy looks for "username": not to create confusion in server.js, we can create an object with that property
            const user = {id: row[0].id, username: row[0].email, name: row[0].name}
            resolve(user);
          }
      });
    });
  };

// getting user  

exports.getUser = (email, password) => {
  console.log(email + " " + password)
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Users WHERE email = ?';
        db.query(sql, [email], (err, row) => {
          if (err) 
            reject(err);
          else if (row === undefined) {
            resolve(false);
          }
          else {
            const user = {id: row[0].id, name: row[0].name, username: row[0].email };
            // check the hashes with an async call, given that the operation may be CPU-intensive (and we don't want to block the server)
            bcrypt.compare(password, row[0].hash).then(result => {
              if(result)
                resolve(user);
              else
                resolve(false);
            });
          }
      });
    });
  };