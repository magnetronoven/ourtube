const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const con = require('../db');
const func = require('../functions');

router.post('/', func.verifytoken, (req, res) => {

  let sql = `SELECT
    CAST(AES_DECRYPT(email, '${func.SECRET_KEY}') AS CHAR) email,
    CAST(AES_DECRYPT(firstname, '${func.SECRET_KEY}') AS CHAR) firstname,
    CAST(AES_DECRYPT(infix, '${func.SECRET_KEY}') AS CHAR) infix,
    CAST(AES_DECRYPT(lastname, '${func.SECRET_KEY}') AS CHAR) lastname,
    active,
    CAST(AES_DECRYPT(created, '${func.SECRET_KEY}') AS CHAR) created,
    role 
    FROM users WHERE id = ? AND token = ?`;

  let inserts = [req.authData.JWTTokenData.id, req.authData.JWTTokenData.token];

  sql = mysql.format(sql, inserts);
  
  con.query(sql, (err, results) => {

    if (err) throw err;

    if (!results[0]) {

      res.sendStatus(401);

    } else if (results[0].active == 0) {

      res.sendStatus(401)

    } else {

      res.status(200).json(results)

    }
  })
})

module.exports = router;