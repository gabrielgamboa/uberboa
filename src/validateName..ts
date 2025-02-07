export function validateName(name: string) {
  return name.match(/[a-zA-Z] [a-zA-Z]+/)
}