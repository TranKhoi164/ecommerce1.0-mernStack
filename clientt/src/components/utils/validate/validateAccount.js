export const validateEmail = (email) => {
  return String(email).toLowerCase().match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

export const validatePassword = (password) => {
  return String(password).match(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  )
}

export const validateRetypePassword = (password, re_password) => {
  return password === re_password
}

export const validateUsername = (username) => {
  return String(username).indexOf(' ') === -1 && String(username).length < 20
}