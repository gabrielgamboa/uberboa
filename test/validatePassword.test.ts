import { validatePassword } from "../src/validatePassword";

test.each([
  "asdFGH123",
  "asdG123456",
  "aG1aG129999"
])("Deve validar a senha %s", function (password: string) {
  const isValid = validatePassword(password);
  expect(isValid).toBe(true);
});

test.each([
  "",
  "asD123",
  "12345678",
  "asdfghjkl",
  "ASDFGHJKL",
  "asddfg123456"
])("Não deve validar a senha %s", function (password: string) {
  const isValid = validatePassword(password);
  expect(isValid).toBe(false);
});