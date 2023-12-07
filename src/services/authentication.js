import {
   createUser,
   getUserByUsername,
   getUserByEmail
} from "../database/UserModel.js";
import { generateHash, random } from "../helpers/index.js";


export const registerUser = async (req) => {
   const { username, email, password } = req.body;

   if (!username || !email || !password) {
      throw {
        status: 400
      }
   }

   let existingUser = await getUserByEmail(email);
   if (existingUser) {
      throw {
        status: 400
      }
   }

   existingUser = await getUserByUsername(username);
   if (existingUser) {
      throw {
        status: 400
      }
   }

   const salt = random();
   const user = await createUser({
      username,
      email,
      authentication: {
         salt,
         password: generateHash(salt, password)
      }
   });

   return user;
};