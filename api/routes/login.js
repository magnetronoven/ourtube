const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const con = require('../db');
const func = require('../functions');
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {

  // Get the salt of the user who wants to login
  con.query(`SELECT CAST(AES_DECRYPT(salt, '${func.SECRET_KEY}') AS CHAR) as salt FROM users WHERE email = AES_ENCRYPT('${req.body.email}', '${func.SECRET_KEY}')`, (err, result) => {
    if (err) throw err;
    if (result.length) {
      req.sendStatus(403);
    }

    // Password basic hashing
    let password = sha1(req.body.password + result[0].salt);

    // Make SQL
    let sql = `SELECT id, token,
      CAST(AES_DECRYPT(email, '${func.SECRET_KEY}') AS CHAR) email,
      CAST(AES_DECRYPT(firstname, '${func.SECRET_KEY}') AS CHAR) firstname,
      CAST(AES_DECRYPT(infix, '${func.SECRET_KEY}') AS CHAR) infix,
      CAST(AES_DECRYPT(lastname, '${func.SECRET_KEY}') AS CHAR) lastname,
      active,
      CAST(AES_DECRYPT(created, '${func.SECRET_KEY}') AS CHAR) created,
      role 
      FROM users WHERE email = AES_ENCRYPT(?, '${func.SECRET_KEY}') AND password = AES_ENCRYPT(?, '${func.SECRET_KEY}')`;

    let inserts = [req.body.email, password];

    sql = mysql.format(sql, inserts);
  
    con.query(sql, (err, results) => {

      if (err) throw err;

      if(!results[0]) {

        res.sendStatus(400)

      } else if (results[0].active == 0) {

        res.sendStatus(400)
        
      } else {
        
        // JWT Token data
        let JWTTokenData = {
          id: results[0].id,
          token: results[0].token,
          role: results[0].role
        }

        jwt.sign({JWTTokenData}, func.SECRET_KEY, (err, token) => {
          res.status(200).json({data: results[0], token})
        })
      }
    })
  })

})

module.exports = router;