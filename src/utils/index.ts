import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/UnauthorizedError";

interface IPayload {
  userId: string;
  email: string;
}
export const createJwt = (payload: IPayload) => {
  console.log(process.env.JWT_SECRET);
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "7d" });
};

export const verifyJwt = (token: string) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  if (
    typeof decoded === "string" ||
    typeof decoded.userId !== "string" ||
    typeof decoded.email !== "string"
  ) {
    throw new UnauthorizedError("Invalid token payload");
  }

  return {
    userId: decoded.userId,
    email: decoded.email,
  };
};
