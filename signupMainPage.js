
let _signupCallbackDismissed = null
let $signupCloseBtn = null
let $signup = null
let IS_TEST = false

let cssLinks = [
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css",
    "https://fonts.googleapis.com/css?family=Roboto:wght@300,500|Oswald:400",
    "https://fonts.googleapis.com/css?family=Open+Sans:300,300i,700,700i",
    "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
    "https://fonts.googleapis.com/css2?family=B612+Mono&display=swap",
]

let signupHtmlText = `

<style>

#signup * {
    font-weight: normal;
}

#signup {
    position: fixed;
    color: rgba(128, 128, 128);

    /* Center the element */
    left: 50%;
    top: 50%;
    width: 800px;
    max-width: 90vw;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 97%);
    border-radius: 2px;
    border: 1px solid rgba(128, 128, 128, 20%);
    opacity: 0;
    pointer-events: none;
    padding: 2em;
    filter: blur(5px);
    transition: opacity 0.25s ease-in-out;

    /* shadow */
    box-shadow: 0 0 2px #00000080;
    z-index: 4;
}

#signup p,
input {
    font-family: 'Poppins', sans-serif;
}

#signup h2 {
    font-family: 'Roboto', sans-serif;
}

#signup.active {
    opacity: 1;
    pointer-events: all;
    filter: blur(0);
    transition: all 0.5s ease-in-out;
}


#signup input {
    font-size: 1em;
}


#signup input[type="email"],
input[type="name"] {
    padding: .7em 0em .7em .7em;
    border: 1px solid #999;
    border-radius: 2px;
    font-size: 1em;
    width: 100%;
}

#signup input[type="email"] {
    margin-top: 10px;
}

#signup input[type="submit"] {
    padding: .7em 1em .7em 1em;
    border: 1px solid rgb(119, 119, 119);
    border-radius: 2px;
    font-size: .8em;
    text-transform: uppercase;
    letter-spacing: .10em;
    font-weight: 500;
    color: #777;
    box-shadow: inset 0 0 0 2px #eaeaea;

}

#signup>h2 {
    text-transform: uppercase;
    color: rgb(119, 119, 119);
    letter-spacing: .10em;
}

#signup-privacy-statement {
    font-size: x-small;
    color: #999;
    margin-top: 10px;
    margin-bottom: 0;
}

#btn-signup {
    /* smaller size */
    font-size: smaller;
    margin-top: 10px;
    background-color: #eee;
}

#btn-signup:active {
    background-color: #ffffff;
    /* Replace with your desired color on click */
}

#signup-close-btn {
    position: absolute;
    width: 1.5em;
    height: 1.5em;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #999;
    top: -0.5em;
    left: -0.5em;
    cursor: pointer;

    /* use fa fa-times as the icon */
    font-family: FontAwesome;
    /* stylelint-disable-line */
    font-size: 1.5em;
    text-align: center;
    line-height: 1.5em;
    color: #999;
    margin: 0;
    padding: 0;
}

</style>

<section id="signup">
<div id="signup-close-btn" class="close-btn">
    <i class="fa fa-times"></i>
</div>
<h2>Plandemic 3: The Great Awakening</h2>
<p>To unlock the full documentary and begin watching, please enter your email below. Your exclusive access to Plandemic 3 starts here!</p>
<!-- Input form for first name and email -->
<form method="get" accept-charset="UTF-8" style="margin-bottom: 0px;">
    <div>
        <input id="singup_first_name" type="name" value="" name="name" placeholder="First Name"
            style="background-color:rgba(255, 255, 255, .97);">
        <input id="signup_email" type="email" value="" name="email" placeholder="Email"
            style="background-color:rgba(255, 255, 255, .97);">
    </div>
    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
    <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text"
            name="b_f8f8f8f8f8f8f8f8f8f8f8_f8f8f8f8f8f8f8f8f8f8f8" tabindex="-1" value=""></div>
    <div class="clear">
        <input type="submit" value="Watch Now" id="btn-signup" class="button">
    </div>
    <p id="signup-privacy-statement">
        By signing up, you agree to receive occasional emails from us and may choose to unsubscribe at anytime.
        View our
        <a href="#">Privacy Policy.</a>
    </p>
    <div id="text-privacy-policy" style="display: none" ;>
        <p style="font-size:10px;"><b>Privacy Policy</b></p>
        <p style="font-size:10px;">We respect your privacy and are committed to protecting it. We collect your
            email for film updates, but we won't share it with anyone. You can unsubscribe at any time.</p>
        <p style="font-size:10px;">If you have questions about this Privacy Policy, please contact us.</p>
    </div>
    <p style="font-size:10px;">
        Support us with a tax deductable <a href="https://plandemicseries.com/donate" target="_blank">donation</a>
    </p>
</form>
<dialog id="dialogBox">
    <p id="dialogBoxmMessage">Invalid email, please try again.</p>
    <button id="closeBtn">Close</button>
</dialog>
</section>
`


// TODO: Redirect to: https://plandemicseries.com/watchparty/

function signupIsActive() {
    return $signup.classList.contains('active')
}

function signupDialogDonate(event) {
    dialogMessage("<iframe src=\"https://plandemicseries.com/donate/\" style=\"width: 30vw;height: 80vh\"></iframe>")
    event.stopPropagation()
    event.stopDefault()
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


function signupDismissed(nextUrl) {
    $signup.classList.remove('active')
    $signupCloseBtn.removeEventListener('click', arguments.callee)
    // Remove element from dom after a timeout.
    setTimeout(() => {
        let $signup = document.querySelector('#signup')
        $signup.style.display = 'none'
    }, 1000)
    _signupCallbackDismissed()
    if (nextUrl) {
        window.open(nextUrl, '_blank').focus();
    }
}

function dialogMessage(message) {
    let dialog = document.getElementById('dialogBox');
    let dialogMessage = document.getElementById('dialogBoxmMessage');
    dialogMessage.innerHTML = message;
    dialog.showModal();
}

function initSignup(rumbledDivId, delay, cbDismissed) {
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
    delay = delay || 500
    _signupCallbackDismissed = cbDismissed || function () {}

    // attach css links to head
    let head = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    for (let i = 0; i < cssLinks.length; i++) {
        link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = cssLinks[i];
        link.media = 'all';
        head.appendChild(link);
    }

    // Insert the dom so that we can add event listeners to it.
    let $target = document.getElementById(rumbledDivId);
    if ($target === null) {
        $target = document.querySelector('body')
    }
    $target.insertAdjacentHTML('afterend', signupHtmlText);
    $signup = document.querySelector('#signup')
    $signupCloseBtn = document.querySelector('#signup-close-btn')
    let hasSignedUpCompleted = getCookie("hasSignedUpCompleted")
    const urlParams = new URLSearchParams(window.location.search);
    // Check if the "signup" parameter is set to "True"
    const signupParam = urlParams.get('signup');
    //const forceSignup = signupParam ? signupParam.toLowerCase() === 'true' : false;
    const forceSignup = true;
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
        signupDismissed("https://plandemicseries.com/watch-the-great-awakening-movie/")
    });

    document.getElementById('closeBtn').addEventListener('click', function (event) {
        let dialog = document.getElementById('dialogBox');
        dialog.close();
    });

    function attachAutoPlayClickListener(divRumbleId) {  // THIS IS OPTIONAL
        // When the rumble video element (from above) appears, attach a click handler
        // to it. This should work with any rumble copy and paste.
        let jobId = setInterval(() => {
            function findVideo(expectedParentId) {
                let videos = document.getElementsByTagName('video');
                if (videos.length < 1) {
                    return null;
                }
                for (let i = 0; i < videos.length; i++) {
                    let video = videos[i];
                    let parentElement = video.parentElement;
                    while (parentElement != null) {
                        if (parentElement.id === expectedParentId) {
                            return video;
                        }
                        parentElement = parentElement.parentElement;
                    }
                }
                return null;
            }
            // Check if the video is there
            let video = findVideo(divRumbleId);
            if (video == null) {
                // Bail for this iteration.
                return;
            }

            function handleBodyClick() {
                // body clicks should only play the video if the signup is not active
                if (signupIsActive()) {
                    return;
                }
                video.play();
                // Remove the click handler after one click
                document.body.removeEventListener('click', arguments.callee);
            }
            // Add the click handler
            document.body.addEventListener('click', handleBodyClick);
            clearInterval(jobId);  // Only attach click handler once.
        }, 16);
    }

    if (rumbledDivId) {
        attachAutoPlayClickListener(rumbledDivId);
        const $divRumble = document.getElementById(rumbledDivId);
        $divRumble.addEventListener('click', function (e) {
            if (signupIsActive()) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
        }, true);
    }
    //assert($signupCloseBtn, 'signupCloseBtn not found')
    //assert($signup, 'signup not found')
    setTimeout(() => {
        $signup.classList.add('active')
    }, delay)
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

