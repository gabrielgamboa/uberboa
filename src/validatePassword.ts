export function validatePassword(password: string) {
  // if (password === "") return false;
  // if (password.length < 8) return false;
  // if (!password.match(/\d+/)) return false;
  // if (!password.match(/[a-z]+/)) return false;
  // if (!password.match(/[A-Z]+/)) return false;
  if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) return true;
  return false;
}