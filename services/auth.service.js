const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { config } = require('../config/config.js');
const UserService = require('./user.services.js');

const service = new UserService();

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    //Valida si el usuario existe, y si no existe arroja un error
    if (!user) {
      throw boom.unauthorized('Usuario no existe');
    }

    //Valida la contraseña, usando la libreria bcrypt para desencriptar la contraseña
    //si es incorrecta arroja un error
    //si es correcta devuelve los datos del usuario menos la contraseña
    const isMatch = await !bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized('Ups! Wrong password.');
    }
    delete user.dataValues.password;
    return user;
  }
  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token,
    };
  }

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized('Usuario no existe');
    }
    const payload = { sub: user.id }
    const token = jwt.sign(payload, config.JwtResetMailerPass, {expiresIn: '15min'});
    const link = `http://myfrontend.com/recovery?token=${token}`
    const mail = {
      from: config.mailerUser, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email para recuperar contraseña', // Subject line
      // text: 'Hola Santi', // plain text body
      html: `<b>Ingresa a este link => ${link}</b>`, // html body
    };
    const rta = await this.sendMail(mail)
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.mailerUser,
        pass: config.mailerPass,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }
}

module.exports = AuthService;
