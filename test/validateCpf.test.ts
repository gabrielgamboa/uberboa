import { validateCpf } from "../src/validateCpf";

test.each([
  "97456321558",
  "71428793860",
  "974.563.215-58",
  "714.287.938-60"
])("Deve validar um cpf %s", function (cpf: string) {
  const isValid = validateCpf(cpf);
  expect(isValid).toBe(true);
});

test.each([
  "",
  undefined,
  null,
  "11111111111"
])("Não deve validar um cpf %s", function (cpf: any) {
  const isValid = validateCpf(cpf);
  expect(isValid).toBe(false);
});