export function VerificationToken(length: number): string {
  const characters =
    "012345678978762309439454356373872032049039584709098756556453322134256";
  const result = [];
  for (let i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * characters.length))
    );
  }
  return result.join("");
}
