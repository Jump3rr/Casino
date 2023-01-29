export const passwordValidation = (
  password: string,
  confirmPassword: string
): string => {
  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }
  if (
    !(
      containsNumbers(password) &&
      containsLowercase(password) &&
      containsUppercase(password) &&
      password.length >= 8
    )
  ) {
    return 'Password must have a minimum of 8 characters and contain at least 1 numeric, 1 uppercase and 1 lowercase.';
  }

  return '';
};

const containsNumbers = (text: string) => {
  return /\d/.test(text);
};

const containsUppercase = (text: string) => {
  return /[A-Z]/.test(text);
};

const containsLowercase = (text: string) => {
  return /[a-z]/.test(text);
};
