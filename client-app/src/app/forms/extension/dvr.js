const rules = {
    password: {
        function: value => value.match(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/),
        message: 'The password must contain 1 number, 1 lowercase, 1 uppercase, 1 non alphanumeric character'
    }
}

export default ({validator}) => {
    Object.keys(rules).forEach(key => 
        validator.register(key, rules[key].function, rules[key].message))
};