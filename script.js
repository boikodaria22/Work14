const tabs = document.getElementById('tabs')
const buttons = Array.from(tabs.getElementsByClassName('tabs_button'))
const target = Array.from(document.getElementsByClassName('tab_content'))
  //переключение между вкладками
function change(array, i) {
  array.forEach(element => {
    element.forEach(i => {
      i.classList.remove('active')
    })
    element[i].classList.add('active')
  })
};
for (let i = 0; i < buttons.length; i++) {
  buttons[i].onclick = (event) => {
    change([buttons, target], i)
    message.hidden = true
  }
};
//sign in
const signIn = document.getElementById('btn-sign-in')
const loginSignIn = document.getElementById('login-sign-in')
const passwordSignIn = document.getElementById('password-sign-in')
let body = document.querySelector('body');
let message = document.createElement('div')
message.className = 'message'
body.appendChild(message)
  //Get
let response = []
async function getUsers() {
  let resp
  resp = await (await fetch('http://localhost:3000/users')).json()
  for (let i = 0; i < resp.length; i++) {
    response.push(resp[i])
  }
}
// post
let resp
async function postUsers() {
  resp = await ((await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      login: `${loginSignUp.value.toLowerCase()}`,
      password: `${passwordSignUp.value}`,
    }),
  })).json())
}
const signUp = document.getElementById('btn-sign-up')
const loginSignUp = document.getElementById('login-sign-up')
const passwordSignUp = document.getElementById('password-sign-up')
const checkPasswordSignUp = document.getElementById('check-password-sign-up')
signIn.onclick = () => {
  function createMessage() {
    if (response.length === 0) {
      if (message) message.innerHTML = ' '
      message.innerHTML = 'Not existing login'
      message.className = 'red'
    }
    if (!loginSignIn.value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
      if (message.hidden = true) message.hidden = false
      if (message) {
        message.innerHTML = ' '
        message.innerHTML = `Your email have to enter in format 'test@gmail.ru'`
        message.className = 'red'
      }
    } else {
      if (loginSignIn.value.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
        for (let i = 0; i < response.length; i++) {
          if (message.hidden = true) message.hidden = false
          if (response[i].login === loginSignIn.value.toLowerCase()) {
            if (response[i].password === passwordSignIn.value) {
              tabs.hidden = 'hidden'
              if (message)
                message.innerHTML = ' '
              message.innerHTML = `Congratulations! You have successfully logged in as user <span>${loginSignIn.value}</span>`
              message.className = 'green'
            } else {
              if (message)
                message.innerHTML = ' '
              message.innerHTML = 'Wrong password. Try again!'
              message.className = 'yellow'
            }
          } else {
            if (message)
              message.innerHTML = ' '
            message.innerHTML = 'Not existing login'
            message.className = 'red'
          }
        }
      } else {
        if (message.hidden = true) message.hidden = false
        if (message) {
          message.innerHTML = ' '
          message.innerHTML = `Your email have to enter in format 'test@gmail.ru'`
          message.className = 'red'
        }
      }
    }
  }
  getUsers()
  createMessage()
}
getUsers()
signUp.onclick = () => {
  let valid
  const validateEmail = (loginSignUp) => {
    if (loginSignUp.value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
      valid = 'true'
    }
  }
  validateEmail(loginSignUp)
  if (valid === 'true') {
    function registr() {
      let answer
      if (message.hidden = true) message.hidden = false
      for (let i = 0; i < response.length; i++) {
        if (response[i].login === loginSignUp.value.toLowerCase()) {
          answer = 0
          if (message) {
            message.innerHTML = ' '
            message.innerHTML = `User with this login exists`
            message.className = 'red'
          }
        }
      }
      if (!loginSignUp.value) {
        if (message)
          message.innerHTML = ' '
        message.innerHTML = `Please enter login`
        message.className = 'red'
      }
      if (!passwordSignUp.value) {
        if (message)
          message.innerHTML = ' '
        message.innerHTML = `Please enter your password`
        message.className = 'red'
      }
      if (!checkPasswordSignUp.value) {
        if (message)
          message.innerHTML = ' '
        message.innerHTML = `Please enter your password again`
        message.className = 'yellow'
      }
      if (passwordSignUp.value !== checkPasswordSignUp.value) {
        if (message)
          message.innerHTML = ' '
        message.innerHTML = `You entered different passwords. Please edit them and try again`
        message.className = 'yellow'
      }
      if (answer !== 0) {
        if (checkPasswordSignUp.value === passwordSignUp.value && checkPasswordSignUp.value && passwordSignUp.value && loginSignUp.value) {
          if (message) {
            message.innerHTML = ''
            message.innerHTML = `You are registered successfully. Your login <span>${loginSignUp.value}<span>`
            message.className = 'green-sign-up'
            postUsers()
          }
        }
      }
    }
    registr()
  } else {
    if (message.hidden = true) message.hidden = false
    if (message) {
      message.innerHTML = ' '
      message.innerHTML = `Please, enter your email in format 'test@gmail.ru'`
      message.className = 'red'
    }
  }
}
