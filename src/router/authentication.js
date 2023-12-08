import { register, login } from "../controllers/authentication.js";

export default function authentication(router) {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
}
