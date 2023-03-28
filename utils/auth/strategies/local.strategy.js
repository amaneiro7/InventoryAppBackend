const boom = require('@hapi/boom');
const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt')

const UserService = require('../../../services/user.services');
const service = new UserService();

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password',
},
  async (email, password, done) => {
  try {
    const user = await service.findByEmail(email);
    //Valida si el usuario existe, y si no existe arroja un error
    !user && done(boom.unauthorized("Usuario no existe"), false)

    //Valida la contraseña, usando la libreria bcrypt para desencriptar la contraseña
    //si es incorrecta arroja un error
    //si es correcta devuelve los datos del usuario menos la contraseña
    await !bcrypt.compare(password, user.password)
    ? done(boom.unauthorized("Ups! Wrong password."), false)
    : delete user.dataValues.password
      return done(null, user)
  } catch (error){
      return done(error, false)
  }
});

module.exports = LocalStrategy
