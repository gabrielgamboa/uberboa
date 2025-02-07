export function validateEmail(email: string) {
  return email.match(/^(.+)@(.+)$/)
}