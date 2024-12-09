const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const validateEmail = (email: string) => emailRegex.test(email);
export const validatePassword = (password: string) => passwordRegex.test(password);