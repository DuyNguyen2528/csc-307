import mongoose from "mongoose";
import userModel from "./user.js";

mongoose.set("debug", true);

mongoose
  .connect("mongodb://localhost:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));
export function fetchlist() {
  return userModel.find();
}
function getUsers(name, job) {
  let promise;
  if (name === undefined && job === undefined) {
    promise = userModel.find();
  } else if (name && !job) {
    promise = findUserByName(name);
  } else if (job && !name) {
    promise = findUserByJob(job);
  }
  return promise;
}

function findUserById(id) {
  return userModel.findById(id);
    
}

export async function addUser(user) {
  const userToAdd = new userModel(user);
  const promise = await userToAdd.save();
  return promise;
}

function findUserByName(name) {
  return userModel.find({ name: name });
}

function findUserByJob(job) {
  return userModel.find({ job: job });
}
function findUserByNameAndJob(userName, userJob) {
  return userModel.find({name: userName , job: userJob })
}
export async function deleteUser(userId) {
  try {
  const result = await userModel.deleteOne({id: userId });
  
  if(result.deletedCount === 0) {
    console.log("No user found with the given ID.");
  } else {
    console.log("User successfully deleted.");
  }
} catch (error) {
  console.error("Error deleting user:", error);
}
}

export default {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  //findUserByNameAndJob,
  fetchlist,
  deleteUser,
};