/**
 * This file is not using!
*/

import { getAllUsers, deleteUser, updateUser } from '../controllers/users.js';
import { isauthenticated,isowner } from "../middlewares/index.js"

 export default function authentication(router){
  router.get("/users", isauthenticated, getAllUsers);
  router.patch("/users/:id", isauthenticated, isowner, updateUser);
  router.delete("/users/:id", isauthenticated, isowner, deleteUser);
}
