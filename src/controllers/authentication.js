import {
  createUser,
  getUserByUsername,
  getUserByEmail
} from "../database/UserModel.js";
import { generateHash, random } from "../helpers/index.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide valid credentials",
          details: "Check your request body and make sure you have entered valid credentials"
        });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Wrong email or password",
          details: "Check your request body."
        });
    }
    
    const expectedHash = generateHash(user.authentication.salt, password);
    if (user.authentication.password !== expectedHash) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Wrong email or password",
          details: "Check your request body and make sure you have entered valid credentials"
        });
    }
    
    const salt = random();
    user.authentication.sessionToken = generateHash(salt, user._id.toString());

    await user.save();

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          username: user.username,
          email: user.email,
          id: user._id
        },
        sessionToken: user.authentication.sessionToken
      }
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(400)
      .json({
        success: false,
        message: "Wrong email or password",
        details: "Check your request body and make sure you have entered valid credentials"
      });
  }
};


export const register = async (req, res) => {
   const { username, email, password } = req.body;

   if (!username || !email || !password) {
      return res.status(400).json({
         success: false,
         status: "Error",
         message: "Oops! something went wrong.",
         details:
            "Check your request body and make sure you have entered valid credentials"
      });
   }

   let existingUser = await getUserByEmail(email);

   if (existingUser) {
      return res.status(400).json({
         success: false,
         status: "Error",
         message: "Oops! something went wrong.",
         details:
            "The email you entered already exists.Please try a different email"
      });
   }

   existingUser = await getUserByUsername(username);

   if (existingUser) {
      return res.status(400).json({
         success: false,
         status: "Error",
         message: "Oops! something went wrong.",
         details:
            "The username you entered already exists.Please try a different username"
      });
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

   res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        username: user.username,
        email: user.email
      }
   });
   try {
   } catch (error) {
      res.status(400).json({
         success: false,
         status: "Error",
         message: error.message
      });
   }
};