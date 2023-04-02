const jwt = require('jsonwebtoken');

const secret = 'myCat'
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY4MDQ1NTI2NCwiZXhwIjoxNjgwNDU4ODY0fQ.98aDrTwsQUBfacp5_44onXz9gjLl9zfiP05fJY0XIBQ'

function verifyToken(token, secret) {
  return jwt.verify(token, secret, { expiresIn: '1h' });
}

const payload = verifyToken(token, secret)
console.log(payload);
