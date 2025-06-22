export const checkValidData = (email, password) => {
  // const isNameValid = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(name);
  const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@()!%*?&]).{8,}$/.test(password);

  // if (!isNameValid) return "Given name is not valid";
  if (!isEmailValid) return "Email ID is not valid";
  if (!isPasswordValid) return "Password is not valid";

  return null;
};
