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
const login = document.getElementById('login-sign-in')
const password = document.getElementById('password-sign-in')
const signUp = document.getElementById('btn-sign-up')
const loginSignUp = document.getElementById('login-sign-up')
const passwordSignUp = document.getElementById('password-sign-up')
const checkPasswordSignUp = document.getElementById('check-password-sign-up')
let body = document.querySelector('body');
let message = document.createElement('div')
message.className = 'message'
body.appendChild(message)
signIn.onclick = () => {
    let response = []
    async function users() {
      let resp
      resp = await (await fetch('http://localhost:3000/users')).json()
      for (let i = 0; i < resp.length; i++) {
        response.push(resp[i])
      }
      if (response.length) {
        function createMessage() {
          for (let i = 0; i < response.length; i++) {
            if (message.hidden = true) message.hidden = false
            if (response[i].login === login.value.toLowerCase()) {
              if (response[i].password === password.value) {
                tabs.hidden = 'hidden'
                if (message)
                  message.innerHTML = ' '
                message.innerHTML = `Congratulations! You have successfully logged in as user <span>${login.value}</span>`
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
        }
        createMessage()
      } else {
        if (message)
          message.innerHTML = ' '
        message.innerHTML = 'Not existing login'
        message.className = 'red'
      }
    }
    users()
  }
  //sign up
signUp.onclick = () => {
  async function postUsers() {
    let resp
    resp = await (await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: loginSignUp.value.toLowerCase(),
        password: passwordSignUp.value,
      }),
    })).json()
  }
  let response = []
  async function users() {
    let resp
    resp = await (await fetch('http://localhost:3000/users')).json()
    for (let i = 0; i < resp.length; i++) {
      response.push(resp[i])
    }
    function createMessage() {
      if (response.length) {
        for (let i = 0; i < response.length; i++) {
          if (message.hidden = true) message.hidden = false
          if (response[i].login !== loginSignUp.value.toLowerCase() || !response.length) {
            function checkPassword() {
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
                message.innerHTML = `You entered different passwords. Please edit them and try again.`
                message.className = 'yellow'
              }
            }
            checkPassword()
            if (checkPasswordSignUp.value && passwordSignUp.value && passwordSignUp.value === checkPasswordSignUp.value) {
              message.innerHTML = `You are registered successfully. Your login <span>${loginSignUp.value}<span>`
              message.className = 'green-sign-up'
              postUsers()
            }
          } else {
            if (message)
              message.innerHTML = ' '
            message.innerHTML = `User with this login exists`
            message.className = 'red'
          }
        }
      } else {
        postUsers()
      }
    }
    createMessage()
  }
  users()
}