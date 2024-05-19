const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

const Users = mongoose.model('Users', {
  username: String,
  email: String,
  mobile: String,
  password: String,

});


module.exports.signup = (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const mobile = req.body.mobile;
  const password = req.body.password;
  const user = new Users({ username: username, password: password, email, mobile });
  user.save()
    .then(() => {
      res.send({ message: "Conta criada com sucesso!" })
    })
    .catch(() => {
      res.send({ message: "Server err." })
    })
}

module.exports.profileById = (req, res) => {
  let uid = req.params.userId
  console.log(uid, 'aaaa')
  Users.findOne({ _id: uid })
    .then((result) => {
      res.send({
        message: 'success.', user: {
          email: result.email,
          mobile: result.mobile,
          username: result.username
        }
      })
    })
    .catch(() => {
      res.send({ message: 'server err' })
    })



}

module.exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  Users.findOne({ username: username })
    .then((result) => {
      if (!result) {
        res.send({ message: 'Usuário não encontrado!' })
      }
      else {
        if (result.password == password) {
          const token = jwt.sign({
            data: result
          }, 'MYCKEY', { expiresIn: '1h' });
          res.send({ message: 'Usuário encontrado!', token: token, userId: result._id })
        }
        if (result.password != password) {

          res.send({ message: 'Senha errada!' })
        }

      }
    })
    .catch(() => {
      res.send({ message: "Server err." })
    })
}