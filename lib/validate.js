

exports.loginValidate = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Required';
    } else if (values.username.length < 3) {
        errors.username = 'Must be greater than or equal to 3 characters';
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

}