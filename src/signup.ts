import crypto from "crypto";
import pgp from "pg-promise";
import express from "express";
import { validateCpf } from "./validateCpf";
import { validatePassword } from "./validatePassword";
import { validateEmail } from "./validateEmail";
import { validateName } from "./validateName.";
import { validateCarPlate } from "./validateCarPlate";

async function signUpUseCase({ name, email, cpf, isDriver, carPlate, isPassenger, password }: any): Promise<{ accountId: string }> {
  const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  const id = crypto.randomUUID();
  const [acc] = await connection.query("select * from ccca.account where email = $1", [email]);
  if (acc) throw new Error('Account already exists with this email')
  if (!validateName(name)) throw new Error('Invalid name')
  if (!validateEmail(email)) throw new Error('Invalid Email')
  if (!validatePassword(password)) throw new Error('Invalid Password')
  if (!validateCpf(cpf)) throw new Error('Invalid CPF')
  if (!isDriver && !validateCarPlate(carPlate)) throw new Error('Invalid Car Plate')
  await connection.query("insert into ccca.account (account_id, name, email, cpf, car_plate, is_passenger, is_driver, password) values ($1, $2, $3, $4, $5, $6, $7, $8)", [id, name, email, cpf, carPlate, !!isPassenger, !!isDriver, password]);
  await connection.$pool.end()
  return {
    accountId: id
  };

}

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
  const signUpRequest = req.body;
  const { name, email, cpf, isDriver, carPlate, isPassenger, password } = signUpRequest;

  const result = await signUpUseCase({ name, email, cpf, isDriver, carPlate, isPassenger, password })

  if (typeof result === "number") {
    res.status(422).json({ message: result });
  } else {
    res.json(result);
  }
  // } finally {
  //   await connection.$pool.end();
  // }
});

app.get("/accounts/:accountId", async function (req, res) {
  const accountId = req.params.accountId;
  const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  const [output] = await connection.query("select * from ccca.account where account_id = $1", [accountId]);
  res.json(output);
});

app.listen(3000);