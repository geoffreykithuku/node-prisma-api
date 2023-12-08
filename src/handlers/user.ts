import { comparePasswords, createJWT, hashPassword } from "utils/auth";
import prisma from "utils/db";

export const createUser = async (req, res) => {
  const user = prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });
  const token = createJWT(user);
  res.json({ token });
};

export const signin = async (req, res) => {
  const user = prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  const isValid = await comparePasswords(
    req.body.password,
    (
      await user
    ).password
  );
  if (!isValid) {
    res.status(401).json({ message: "Wrong password" });
    return;
  }

  const token = createJWT(user);
  res.json({ token });
};
