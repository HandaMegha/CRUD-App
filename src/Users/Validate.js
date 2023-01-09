const Validate = (values) => {
    const errors = {};
    if(!values.firstname){
        errors.firstname = 'Please enter your first name';
    }
    if(!values.lastname){
        errors.lastname = 'Please enter your last name';
    }
    if(!values.email){
        errors.email = 'Please enter your email';
    }
    if(!values.address){
        errors.address = 'Please enter your address';
    }
    if(!values.phone){
        errors.phone = 'Please enter your phone';
    }
    return errors;
}

export default Validate;