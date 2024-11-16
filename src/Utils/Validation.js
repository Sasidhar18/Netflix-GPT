import { emailRegex } from "./constants";

export default function Validation(email, password, name, signup = false) {
  const emailVal = emailRegex.test(email);
  const passwordVal = password !== "";
  const nameVal = name !== "";

  if (!emailVal) return "Please enter a correct email address";
  if (!passwordVal) return "Please enter a password";
  if (signup) {
    return !nameVal ? "Please enter a name" : null;
  }

  return null;
}
