import { getUserBySessionToken } from "../database/UserModel.js";

export default async function (req, res, next) {
   try {
      let sessionToken = req.headers["authorization"];
      if (!sessionToken) {
         return res.status(400).json({
           success: false,
           message: "Invalid or missing session-token"
         });
      }
      sessionToken = sessionToken.split(" ")[1]
      

      const existingUser = await getUserBySessionToken(sessionToken);
      
      if (!existingUser) {
        return res.status(400).json({
           success: false,
           message: "Invalid or missing session-token"
         });
      }

      req.identity = existingUser;

      next();
   } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing session-token",
        details: error.message
      });
   }
}
