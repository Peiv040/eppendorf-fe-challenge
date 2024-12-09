import validator from "validator";

const validateRegistration = (data: any) => {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  }

  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = "A valid email address is required.";
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!data.password || !passwordRegex.test(data.password)) {
    errors.password =
      "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.";
  }

  return errors;
};

export { validateRegistration };
