const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');
const boom = require('@hapi/boom');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  try {
    return done(null, payload)
  } catch (error) {
    return done(boom.unauthorized('Token Invalido'));
  }
})

module.exports = JwtStrategy
