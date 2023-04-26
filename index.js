const form = document.getElementById("form")
const username = document.getElementById("username")
const email = document.getElementById("email")
const password = document.getElementById("password")
const password2 = document.getElementById("password2")

form.addEventListener("submit", (e) => {
  e.preventDefault()
  checkRequired()
})

const checkLength = (element) => {
  if (element.name == "username") {
    return element.value.length > 3 ? true : false
  } else if (element.name == "password") {
    return element.value.length > 5 ? true : false
  }
}

const setError = (element, message) => {
  const inputControl = element.parentElement
  const errorDisplay = inputControl.querySelector(".error")

  errorDisplay.innerText = message
  inputControl.classList.add("error")
  inputControl.classList.remove("success")
}

const setSuccess = (element) => {
  const inputControl = element.parentElement
  const errorDisplay = inputControl.querySelector(".error")
  errorDisplay.innerText = ""
  inputControl.classList.add("success")
  inputControl.classList.remove("error")
}

const checkEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

const checkPasswordsMatch = (pass1, pass2) => {
  return pass1 === pass2 ? true : false
}

const checkRequired = () => {
  let flag = false
  const usernameValue = username.value.trim()
  const emailValue = email.value.trim()
  const passwordValue = password.value.trim()
  const password2Value = password2.value.trim()

  if (checkLength(username)) {
    setSuccess(username)
  } else {
    setError(username, "Username must be at least 3 characters")
  }
  // console.log(checkEmail(emailValue))
  if (emailValue === "") {
    setError(email, "Email is required")
  } else if (!checkEmail(emailValue)) {
    setError(email, "Email is not valid")
  } else {
    setSuccess(email)
  }

  if (checkLength(password)) {
    setSuccess(password)
  } else {
    setError(password, "Password must be at least 6 characters")
  }
  if (checkLength(password2)) {
    setSuccess(password2)
  } else {
    setError(password2, "Password 2 is required")
  }

  if (
    checkLength(username) &&
    checkLength(password) &&
    checkEmail(emailValue) &&
    checkPasswordsMatch(passwordValue, password2Value)
  ) {
    let arr = []
    const formData = {
      username: username.value,
      email: email.value,
      password: password.value,
      password2: password2.value,
    }
    let localData = JSON.parse(localStorage.getItem("formData"))
    if (localData == null) {
      arr.push(formData)
    } else {
      for (let i = 0; i < localData.length; i++) {
        arr.push(localData[i])
      }
      arr.push(formData)
    }

    localStorage.setItem("formData", JSON.stringify(arr))
    username.value = ""
    email.value = ""
    password.value = ""
    password2.value = ""
  }
}
