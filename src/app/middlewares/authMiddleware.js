import jwt from "jsonwebtoken";
import authConfig from "../../config/auth";
import { promisify } from "util";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (!authHeader) {
    return res.status(401).json({ error: "Token não encontrado" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const tokenDecoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = tokenDecoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};
