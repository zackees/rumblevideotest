
let _signupCallbackDismissed = null
let $signupCloseBtn = null
let $signup = null
let IS_TEST = false

let cssLinks = [
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css",
    "https://fonts.googleapis.com/css?family=Open+Sans:300,300i,700,700i",
    "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
    "https://fonts.googleapis.com/css2?family=B612+Mono&display=swap",
    'https://fonts.googleapis.com/css?family=Bebas+Neue%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic%7CPoppins%3A100%2C100italic%2C200%2C200italic%2C300%2C300italic%2C400%2C400italic%2C500%2C500italic%2C600%2C600italic%2C700%2C700italic%2C800%2C800italic%2C900%2C900italic&#038;display=swap&#038;ver=6.2.2'
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

#dialogBox {
    border-radius: 2px; 
    background-color: rgba(250, 250, 250, 97%);   
}

#dialogBox * {
    font-weight: 400;
    color: rgba(128, 128, 128);
    font-family: 'Poppins', sans-serif;

}

#dialogBox button {
    border-radius: 1px;
    border: 1px solid rgba(128, 128, 128, 80%);
    background-color: rgba(250, 250, 250, 97%);
}

#signup {
    width: min(80vw, 600px);
}

#signup a {
    color: rgb(30, 146, 159);
    text-decoration: none; /* Removes the underline from links */
}

#signup p,
input {
    font-weight: 400;
    font-family: 'Poppins', sans-serif;
    font-size: 12pt;
    color: #666666;

}

#signup h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 40pt;
    color: black;
}

@media (max-width: 800px) {
    #signup h2 {
        font-size: 30pt !important;
    }
}

#signup.active {
    opacity: 1;
    pointer-events: all;
    filter: blur(0);
    transition: all 0.5s ease-in-out;
}


#signup input {
    font-size: 16pt;
    font-color: #666666;
}


#signup input[type="email"],
input[type="name"] {
    box-sizing: border-box; /* This line is added */
    padding: .7em 0em .7em .7em;
    border: 1px solid #999;
    border-radius: 2px;
    width: 100%;
}

#signup input[type="email"] {
    margin-top: 10px;
}

#signup input[type="submit"] {
    padding: .7em 1em .7em 1em;
    border: 2px solid #1e929f; /* Border color is the same as the background color */
    border-radius: 2px;
    font-size: 1.2em;
    text-transform: uppercase;
    /* letter-spacing: .10em; */
    font-weight: 500;
    color: #FFFFFF; /* Text color is now white */
    background-color: #1e929f; /* Background color is the specified green */

    transition: background-color 0.5s, color 0.5s, border-color 0.5s; /* Added transition for border color */
    width: 100%;
    margin-bottom: .5em;
}

#signup input[type="submit"]:hover {
    color: black;
    background-color: #FFFFFF; /* Background becomes white on hover */
    border-color: #1e929f; /* Border color becomes white on hover */
}

#signup>h2 {
    text-transform: uppercase;
    /* letter-spacing: .10em; */
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
    font-family: FontAwesome !important;
    /* stylelint-disable-line */
    font-size: 1.5em;
    text-align: center;
    line-height: 1.5em;
    color: #999;
    margin: 0;
    padding: 0;
}

#Layer_1 {
    margin: 2px;
}

</style>

<section id="signup">
<div id="signup-close-btn" class="close-btn">
    <!-- SVG goes here as the close button -->
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 365.7 365.7" style="enable-background:new 0 0 365.7 365.7; width: 12px; height: 12px;" xml:space="preserve">
        <style type="text/css">
            .st0{fill:#999;} /* change SVG color to match the close button color */
        </style>
        <path class="st0" d="M243.2,182.9L356.3,69.7c12.5-12.5,12.5-32.8,0-45.2L341.2,9.4c-12.5-12.5-32.8-12.5-45.2,0L182.9,122.5
            L69.7,9.4C57.2-3.1,37-3.1,24.5,9.4L9.4,24.5C-3.1,37-3.1,57.2,9.4,69.7l113.2,113.2L9.4,296c-12.5,12.5-12.5,32.8,0,45.2l15.1,15.1
            c12.5,12.5,32.8,12.5,45.2,0l113.1-113.1L296,356.3c12.5,12.5,32.8,12.5,45.2,0l15.1-15.1c12.5-12.5,12.5-32.8,0-45.2L243.2,182.9z"/>
    </svg>
</div>
<h2 class="signup-header">Plandemic 3: The Great Awakening</h2>
<p class="signup-p-unlock">Enter your email below to watch or download the full movie. Your exclusive access to The Great Awakening starts here!</p>
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
        <input type="submit" value="WATCH & DOWNLOAD FREE" id="btn-signup" class="button">
    </div>
    <p id="signup-privacy-statement">
        By signing up, you agree to receive occasional emails from us and may choose to unsubscribe at anytime.
        View our
        <a id="signup-privacy-statement-link" href="#">Privacy Policy.</a>
    </p>
    <div id="text-privacy-policy" style="display: none;">
        <p style="font-size:10px;"><b>Privacy Policy</b></p>
        <p style="font-size:10px;">We respect your privacy and are committed to protecting it. We collect your
            email for film updates, but we won't share it with anyone. You can unsubscribe at any time.</p>
        <p style="font-size:10px;">If you have questions about this Privacy Policy, please contact us.</p>
    </div>
</form>
<dialog id="dialogBox">
    <p id="dialogBoxmMessage">Invalid email, please try again.</p>
    <button id="closeBtn" style="background-color:rgba(255, 255, 255, .97);">Close</button>
</dialog>
</section>
`

// classes:
// signup-tax-deductabile
// signup-header
// signup-p-unlock
// singup_first_name
// signup_email

function signupLoadCssResources() {
    // attach css links to head
    if (signupLoadCssResources.loaded) {
        return
    }
    signupLoadCssResources.loaded = true
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
}

(function() {
    signupLoadCssResources()
})();

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

function signupHasCompleted() {
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
    return getCookie("hasSignedUpCompleted")
}

let gSignupInitialized = false

function initSignup(rumbledDivId, delay, cbDismissed) {
    let hasSignedUpCompleted = signupHasCompleted()
    if (hasSignedUpCompleted) {
        window.open("https://plandemicseries.com/watch-the-great-awakening-movie/", '_blank').focus();
        return;
    }
    if (!gSignupInitialized) {
        gSignupInitialized = true
        delay = delay || 0
        _signupCallbackDismissed = cbDismissed || function () {}
        signupLoadCssResources()
        // Insert the dom so that we can add event listeners to it.
        let $target = document.getElementById(rumbledDivId);
        if ($target === null) {
            $target = document.querySelector('body')
        }
        $target.insertAdjacentHTML('afterend', signupHtmlText);
        $signup = document.querySelector('#signup')
        $signupCloseBtn = document.querySelector('#signup-close-btn')

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


        let $btnPrivacyPolicy = document.querySelector('#signup-privacy-statement-link')
        $btnPrivacyPolicy.addEventListener('click', (e) => {
            e.preventDefault()
            e.stopPropagation()
            let $text = document.querySelector('#text-privacy-policy')
            dialogMessage($text.innerHTML)
        })

        document.addEventListener('click', function(e) {
            if (signupIsActive() && !e.target.closest('#signup')) {
                e.preventDefault()
                e.stopPropagation()
                signupDismissed();
            }
        }, true);
    }

    // Needs to be re-added because it's removed during dismissal.
    $signupCloseBtn.addEventListener('click', (e) => {
        e.preventDefault()
        e.stopPropagation()
        signupDismissed()
    })

    //assert($signupCloseBtn, 'signupCloseBtn not found')
    //assert($signup, 'signup not found')
    setTimeout(() => {
        $signup.classList.add('active')
    }, delay)
}

