import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      lowercase: true
   },
   email: {
      type: String,
      required: true,
      lowercase: true
   },
   authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false }
   },
   createdOn: {
      type: Date,
      default: Date.now
   }
});

export const UserModel = mongoose.model("User", UserSchema);

// User Actions
export const getUsers = () => UserModel.find();
export const getUserById = id => UserModel.findById(id);
export const getUserByEmail = email => UserModel.findOne({ email });
export const getUserByUsername = username => UserModel.findOne({ username });
export const getUserBySessionToken = token =>
   UserModel.findOne({ "authentication.sessionToken": token });
export const createUser = value =>
   new UserModel(value).save().then(user => user.toObject());
export const deleteUserById = id => UserModel.findOneAndDelete(id);
export const updateUserById = id => UserModel.findByIdAndUpdate(id);
