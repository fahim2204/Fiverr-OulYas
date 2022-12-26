exports.loginValidate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length < 3) {
    errors.username = "Must be greater than or equal to 3 characters";
  }

  // validation for password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password = "Must be greater than 6 and less then 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
};

exports.registerValidate = (values) => {
  const errors = {};

  //Username
  if (!values.username) {
    errors.username = "Required";
  } else if (values.username.length < 3) {
    errors.username = "Must be greater than or equal to 3 characters";
  }
  //Full Name
  if (!values.fullName) {
    errors.fullName = "Required";
  } else if (values.fullName.length < 3) {
    errors.fullName = "Must be greater than or equal to 3 characters";
  }

  // Password
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password = "Must be greater than 6 and less then 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  //Confirm Password
  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.confirmPassword.length < 6 || values.confirmPassword.length > 20) {
    errors.confirmPassword = "Must be greater than 6 and less then 20 characters";
  } else if (values.confirmPassword.includes(" ")) {
    errors.confirmPassword = "Invalid Confirm Password";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwrod and Confirm Password did not match";
  }

  return errors;
};
