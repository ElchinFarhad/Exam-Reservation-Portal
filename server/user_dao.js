'use strict'

const User = require('./user');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./db/scheduling.db', (err) => {
});

const createUser = function (row) {
  const id = row.TID;
  const name = row.name;
  const hash = row.password;

  return new User(id, name, hash);
}



exports.getUser = function (name) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Teachers WHERE name = ?"
    db.all(sql, [name], (err, rows) => {
      if (err) 
        reject(err);
      else if (rows.length === 0) 
        resolve(undefined);
      else {
        const user = createUser(rows[0]);
        resolve(user);
      }
      
    });
  });
};

exports.getStudentById = function (id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT name FROM Students WHERE SID = ?"
    db.all(sql, [id], (err, rows) => {
      if (err) 
        reject(err);
      else if (rows.length === 0) 
      reject(err);
        // resolve(undefined);
      else {
        const user = createUser(rows[0]);
        resolve(user);
      }
    });
  });
};
exports.getUserById = function (id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Teachers WHERE id = ?"
    db.all(sql, [id], (err, rows) => {
      if (err) 
        reject(err);
      else if (rows.length === 0) 
        resolve(undefined);
      else {
        const user = createUser(rows[0]);
        resolve(user);
      }
    });
  });
};

exports.checkPassword = function (user, password) {
  let hash = bcrypt.hashSync(password, 10);

  return bcrypt.compareSync(password, user.hash);
}

