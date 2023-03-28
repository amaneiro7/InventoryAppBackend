const bcrypt = require('bcrypt')

async function verifyPassword() {
  const myPassword = 'admin123.202'
  const hash = '$2b$10$Q06Yg/0yv.YO026PprVoLOWRlR.0OS19Om7pSOj1J/8159g83sBDq'
  const isMatch = await bcrypt.compare(myPassword, hash)
  console.log(isMatch);
}

verifyPassword()
