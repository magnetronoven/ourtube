const jwt = require('jsonwebtoken');

module.exports = {
  SECRET_KEY: "5QxpRL8ex9",
  makeId: function() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";	

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  },
  makeToken: function() {
    let token = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";	

    for (let i = 0; i < 10; i++) {
      token += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return token;
  },
  verifytoken: function(req, res, next) {
    // console.log(req.headers['authorization']);
    // const bearerHeader = req.headers['authorization'];
    
    if(typeof bearerHeader !== 'undifined') {
      // const bearer = bearerHeader.split(' ');
      // const bearerToken = bearer[1];
      // TODO get token out variable SECRET_KEY
      jwt.verify(req.headers['authorization'], "5QxpRL8ex9", (err, authData) => {
        if (err) {
          res.sendStatus(403);
        } else {
          req.authData = authData;
          next();
        }
      })
    } else {
      res.sendStatus(403);
    }
  }
}