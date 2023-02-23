const express = require('express');
const routerApi = require('./routes');
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
app.use(express.json());


routerApi(app);
app.listen(port);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


