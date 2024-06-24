const isAValidePassword = (value) => {
    return value && value.length >= 8 && value.search(/[a-z]/) >= 0 && value.search(/[A-Z]/) >= 0 && value.search(/[0-9]/) >= 0;
};

module.exports = { isAValidePassword };
