//======================= Общие функции =====================================
function getDomElementsById(id){
  return document.getElementById(id)
}

function getDomElementsByClass(place,className){
  return place.getElementsByClassName(className)
}

function getDomElementsByQuerySelector(selector){
 return document.querySelector(selector)
}

function createDomElements(element){
 return document.createElement(element)
}

function createMessagesForCheck(text, color){
 if (message.hidden = true) message.hidden = false
 if (message) {
   message.innerHTML = ' '
   message.innerHTML = text
   message.className = color
 }
}
//========================  Navigation Elements Dom =======================
const tabs = getDomElementsById('tabs')
const buttons = Array.from(getDomElementsByClass(tabs,'tabs_button'))
const target = Array.from(getDomElementsByClass(document,'tab_content'))
//========================  TABS Change ====================================
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
//========================  Sign In Elements Dom =======================
const signIn =  getDomElementsById('btn-sign-in')
const loginSignIn =  getDomElementsById('login-sign-in')
const passwordSignIn =  getDomElementsById('password-sign-in')
let body = getDomElementsByQuerySelector('body')
let message =createDomElements('div')
message.className = 'message'
body.appendChild(message)
//========================  GET ========================================
let response = []
async function getUsers() {
  let resp
  resp = await (await fetch('http://localhost:3000/users')).json()
  for (let i = 0; i < resp.length; i++) {
    response.push(resp[i])
  }
}
//======================== POST ========================================
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
//========================  Sign Up Elements Dom =======================
const signUp = getDomElementsById('btn-sign-up')
const loginSignUp = getDomElementsById('login-sign-up')
const passwordSignUp = getDomElementsById('password-sign-up')
const checkPasswordSignUp = getDomElementsById('check-password-sign-up')

const validateString = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
//========================  Sign In Events ===========================
signIn.onclick = () => {
  function createMessage() {
    if (response.length === 0) {
      createMessagesForCheck('Not existing login', 'red')
    }
    if (!loginSignIn.value.match(validateString)) {
      createMessagesForCheck(`Your email have to enter in format 'test@gmail.ru'`, 'red')
    } else {
      if (loginSignIn.value.match(validateString)) {
        for (let i = 0; i < response.length; i++) {
          if (message.hidden = true) message.hidden = false
          if (response[i].login === loginSignIn.value.toLowerCase()) {
            if (response[i].password === passwordSignIn.value) {
              tabs.hidden = 'hidden'
              createMessagesForCheck(`Congratulations! You have successfully logged in as user <span>${loginSignIn.value}</span>`, 'green')
            } else {
              createMessagesForCheck('Wrong password. Try again!', 'yellow')
            }
          } else {
            createMessagesForCheck('Not existing login', 'red')
          }
        }
      } else {
        createMessagesForCheck( `Your email have to enter in format 'test@gmail.ru'`, 'red')
      }
    }
  }
  getUsers()
  createMessage()
}
getUsers()
//========================  Sign UP Events ===========================
signUp.onclick = () => {
  let valid
  const validateEmail = (loginSignUp) => {
    if (loginSignUp.value.match(validateString)) {
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
          createMessagesForCheck('User with this login exists', 'red')
        }
      }
      if (!loginSignUp.value) {
        createMessagesForCheck('Please enter login', 'red')
      }
      if (!passwordSignUp.value) {
        createMessagesForCheck('Please enter your password', 'red')
      }
      if (!checkPasswordSignUp.value) {
        createMessagesForCheck('Please enter your password again', 'yellow')
      }
      if (passwordSignUp.value !== checkPasswordSignUp.value) {
        createMessagesForCheck('You entered different passwords. Please edit them and try again.', 'yellow')
      }
      if (answer !== 0) {
        if (checkPasswordSignUp.value === passwordSignUp.value && checkPasswordSignUp.value && passwordSignUp.value && loginSignUp.value) {
          createMessagesForCheck(`You are registered successfully. Your login <span>${loginSignUp.value}<span>`, 'green-sign-up')
          postUsers()
        }
      }
    }
    registr()
  } else {
    createMessagesForCheck(`Please, enter your email in format 'test@gmail.ru'`, 'red')
  }
}
