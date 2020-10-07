const auth = require('basic-auth')

const admins = {
  'Jennifer': { password: 'Jennifer' },
};

const authenticate = (req, res, next) => {
  var user = auth(req);
  if (!user || !admins[user.name] || admins[user.name].password !== user.pass) {
    res.set('WWW-Authenticate', 'Basic realm="example"');
    return res.sendStatus(401)
  }
  return next();
};

module.exports = authenticate