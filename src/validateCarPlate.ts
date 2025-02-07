export function validateCarPlate(carPlate: string) {
  return carPlate.match(/[A-Z]{3}[0-9]{4}/)
}