import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  photo: {
    contentType: String
  }
});

const user = mongoose.model("users", UserSchema);

export default user