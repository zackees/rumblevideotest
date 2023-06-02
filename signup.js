
let _signupCallbackDismissed = null
let $signupCloseBtn = null
let $signup = null
let IS_TEST = false

// TODO: Redirect to: https://plandemicseries.com/watchparty/

function signupIsActive() {
    return $signup.classList.contains('active')
}

function signupAddContact(name, email) {
    let args = ""
    if (IS_TEST) {
        args = "?is_test=true"
    }
    const url = "https://cakemail-addcontact.onrender.com/add_user_contact" + args
    const data = {
        "name": name,
        "email": email
    };
    fetch(url, {  // specify your URL here
        method: 'POST',    // or 'GET', depends on your requirements
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (response.ok) {
                // Set the cookie here if the request was successful
                document.cookie = "hasSignedUpCompleted=true;path=/";
                return response.json();
            }
            throw new Error('Request failed!');
        })
        .then(data => console.log(data))
        .catch((error) => console.error('Error:', error));
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
    signupAddContact($firstName.value, $email.value);
    event.preventDefault();
    event.stopPropagation();
    signupDismissed()
});

document.getElementById('closeBtn').addEventListener('click', function (event) {
    let dialog = document.getElementById('dialogBox');
    dialog.close();
});

function initSignup(cbDismissed) {
    function getCookie(name) {
        let cookieArr = document.cookie.split(";");

        // Loop through the array elements
        for (let i = 0; i < cookieArr.length; i++) {
            let cookiePair = cookieArr[i].split("=");

            /* Removing whitespace at the beginning of the cookie `name`
            and compare it with the given string */
            if (name == cookiePair[0].trim()) {
                // Decode the cookie value and return
                return decodeURIComponent(cookiePair[1]);
            }
        }

        // Return null if not found
        return null;
    }
    _signupCallbackDismissed = cbDismissed
    $signup = document.querySelector('#signup')
    $signupCloseBtn = document.querySelector('#signup-close-btn')
    let hasSignedUpCompleted = getCookie("hasSignedUpCompleted")
    const urlParams = new URLSearchParams(window.location.search);
    // Check if the "signup" parameter is set to "True"
    const signupParam = urlParams.get('signup');
    const forceSignup = signupParam ? signupParam.toLowerCase() === 'true' : false;
    if (hasSignedUpCompleted && !forceSignup) {
        //$signup.classList.remove('active')
        return
    }
    //assert($signupCloseBtn, 'signupCloseBtn not found')
    //assert($signup, 'signup not found')
    $signup.classList.add('active')
    $signupCloseBtn.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        signupDismissed()
    })
    let $btnPrivacyPolicy = document.querySelector('#signup-privacy-statement')
    $btnPrivacyPolicy.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        let $text = document.querySelector('#text-privacy-policy')
        dialogMessage($text.innerHTML)
    })
}

