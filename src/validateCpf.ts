const CPF_LENGTH = 11;

export function validateCpf(cpf: string) {
  if (!cpf) return false;
  cpf = clean(cpf);
  if (cpf.length !== CPF_LENGTH) return false;
  if (allDigitsAreTheSame(cpf)) return false;
  const digit1 = calculateDigit(cpf, 10);
  const digit2 = calculateDigit(cpf, 11);
  return extractDigit(cpf) === `${digit1}${digit2}`;
}

function clean(cpf: string) {
  return cpf.replace(/\D/g, "");
}

function allDigitsAreTheSame(cpf: string) {
  const [firstDigit] = cpf;
  return [...cpf].every((digit: string) => digit === firstDigit);
}

function calculateDigit(cpf: string, factor: number) {
  let total = 0;
  for (const digit of cpf) {
    if (factor > 1) total += parseInt(digit) * factor--;
  }
  const rest = total % 11;
  return (rest < 2) ? 0 : 11 - rest;
}

function extractDigit(cpf: string) {
  return cpf.substring(cpf.length - 2, cpf.length);
}