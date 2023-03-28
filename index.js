const express = require('express');
const routerApi = require('./routes');
const passport = require('passport')
const { checkApiKey } = require('./middlewares/auth.handler.js')
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const cors = require('cors');

const app = express();
const port = 3001;
const whitelist = ["http://localhost:8080", "https://myapp.co","http://localhost:3000"];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    };
  }
};
app.use(cors(options));
require('./utils/auth')
app.use(express.json());


app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, soy una nueva ruta')
})


app.use(passport.initialize());
routerApi(app);
app.listen(port);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


