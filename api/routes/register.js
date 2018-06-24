const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const con = require('../db');
const func = require('../functions');
const sha1 = require('sha1');

function idIsNotInUse(callback) {
  let id = func.makeId();
  con.query(`SELECT * FROM users WHERE id = '${id}'`, (err, result, fields) => {
    if (err) throw err;
    console.log(result);
    if (result[0]) {
      idIsNotInUse();
    } else {
      callback(id);
    }
  })
}

router.post('/',(req, res) => {
  idIsNotInUse(id => {
    if (req.body.infix === '') {
      req.body.infix = null;
    }

    // needs a check if email allready excist

    let token = func.makeToken();
    let salt = func.makeId();

    // Password hashing <can be better :) >
    let password = sha1(req.body.password + salt);
    let sql = `INSERT INTO users (id, token, salt, email, firstname, infix, lastname, password, active, created, role) 
    VALUES (?, 
    ?, 
    AES_ENCRYPT(?, '${func.SECRET_KEY}'), 
    AES_ENCRYPT(?, '${func.SECRET_KEY}'), 
    AES_ENCRYPT(?, '${func.SECRET_KEY}'),
    AES_ENCRYPT(?, '${func.SECRET_KEY}'), 
    AES_ENCRYPT(?, '${func.SECRET_KEY}'), 
    AES_ENCRYPT(?, '${func.SECRET_KEY}'), 
    1, 
    AES_ENCRYPT(NOW(), '${func.SECRET_KEY}'), (SELECT role FROM roles WHERE role = 'user'))`;

    let inserts = [id, token, salt, req.body.email, req.body.firstname, req.body.infix, req.body.lastname, password];

    sql = mysql.format(sql, inserts);
    console.log(sql);
    con.query(sql, (err, results, fields) => {
      if (err) throw err;
      res.status(201).json({
        msg: "Account succesfull made"
      });
    })

  });
});

module.exports = router;