const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken')
const validatorHandler = require('../middlewares/validator.handler');
const { loginAuthSchema } = require('../schemas/auth.schema');
const { config } = require('../config/config');


const router = express.Router();

//POST
router.post('/login',
validatorHandler(loginAuthSchema, 'body'),
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
      const user = req.user
      const payload = {
        sub: user.id,
        // role: user.role
      }
      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' })
      res.json({
        user,
        token
      });
    } catch (error) {
      next(error)
    };
  });

module.exports = router;
