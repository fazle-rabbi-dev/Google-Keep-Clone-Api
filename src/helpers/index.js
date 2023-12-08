import crypto from "crypto";

const SECRET = process.env.SECRET_KEY;

export const generateHash = (salt, password) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

export const random = () => crypto.randomBytes(128).toString("base64");
