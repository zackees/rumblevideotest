
let _signupCallbackDismissed = null
let $signupCloseBtn = null
let $signup = null

function signupIsActive() {
    return $signup.classList.contains('active')
}

function signupAddContact(name, email) {
    let message = `Hi ${name},\n\nI'm writing to let you know that I've added your email ${email} to my contact list.`
    alert(message)
}

function signupDismissed() {
    $signup.classList.remove('active')
    $signupCloseBtn.removeEventListener('click', arguments.callee)
    // Remove element from dom after a timeout.
    setTimeout(() => {
        let $signup = document.querySelector('#signup')
        $signup.style.display = 'none'
    }, 1000)
    _signupCallbackDismissed()
}



function dialogMessage(message) {
    let dialog = document.getElementById('dialogBox');
    let dialogMessage = document.getElementById('dialogBoxmMessage');
    dialogMessage.innerHTML = message;
    dialog.showModal();
}


document.getElementById('btn-signup').addEventListener('click', function (event) {
    // Validation functions
    function validateEmail(email) {
        const regex = '[^\\.\\s@:](?:[^\\s@:]*[^\\s@:\\.])?@[^\\.\\s@]+(?:\\.[^\\.\\s@]+)*';
        function emailRegex({ exact } = {}) {
            return exact ? new RegExp(`^${regex}$`) : new RegExp(regex, 'g');
        }
        const isEmail = emailRegex({ exact: true }).test(email);
        return isEmail;
    }
    function validateName(name) {
        let re = /^[a-zA-Z\s]+$/;
        return re.test(name);
    }
    // Dom elements
    const $firstName = document.getElementById('singup_first_name');
    const $email = document.getElementById('signup_email');
    let emailInput = document.getElementById('signup_email').value;
    let nameInput = document.getElementById('singup_first_name').value;

    if (!validateName(nameInput)) {
        dialogMessage("Invalid name, please try again.")
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    if (!validateEmail(emailInput)) {
        dialogMessage("Invalid email, please try again.")
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    //let form = document.getElementById('user_form');

    signupAddContact($firstName.value, $email.value);
    event.preventDefault();
    event.stopPropagation();
    /*
    fetch('http://localhost:8080/add_user_contact', {  // specify your URL here
        method: 'POST',    // or 'GET', depends on your requirements
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => console.error('Error:', error));
    */
    signupDismissed()
});

document.getElementById('closeBtn').addEventListener('click', function (event) {
    let dialog = document.getElementById('dialogBox');
    dialog.close();
});

function initSignup(cbDismissed) {
    _signupCallbackDismissed = cbDismissed
    $signup = document.querySelector('#signup')
    $signupCloseBtn = document.querySelector('#signup-close-btn')
    //assert($signupCloseBtn, 'signupCloseBtn not found')
    //assert($signup, 'signup not found')
    $signup.classList.add('active')
    $signupCloseBtn.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        signupDismissed()
    })
}

