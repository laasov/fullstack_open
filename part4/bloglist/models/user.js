const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  id: String
})

userSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject._v
    delete returnObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User