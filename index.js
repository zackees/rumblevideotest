initSignup(function () {
    console.log('signup closed');
});

!function (r, u, m, b, l, e) { r._Rumble = b, r[b] || (r[b] = function () { (r[b]._ = r[b]._ || []).push(arguments); if (r[b]._.length == 1) { l = u.createElement(m), e = u.getElementsByTagName(m)[0], l.async = 1, l.src = "https://rumble.com/embedJS/urq2e0" + (arguments[1].video ? '.' + arguments[1].video : '') + "/?url=" + encodeURIComponent(location.href) + "&args=" + encodeURIComponent(JSON.stringify([].slice.apply(arguments))), e.parentNode.insertBefore(l, e) } }) }(window, document, "script", "Rumble");

Rumble("play", { "video": "v2nwlhq", "div": "rumble_v2nwlhq" });
const $divRumble = document.getElementById('rumble_v2nwlhq');
$divRumble.addEventListener('click', function (e) {
    if (signupIsActive()) {
        e.preventDefault();
        e.stopPropagation();
        return;
    }
}, true);

let jobId = setInterval(() => {
    let videos = document.getElementsByTagName('video');
    if (videos.length < 1) {
        return
    }
    // Define the click handler
    function handleBodyClick() {
        if (signupIsActive()) {
            return;
        }
        for (let i = 0; i < videos.length; i++) {
            let video = videos[i];
            video.play();
        }
        // Remove the click handler after one click
        document.body.removeEventListener('click', handleBodyClick);
    }
    // Add the click handler
    document.body.addEventListener('click', handleBodyClick);
    clearInterval(jobId);
}, 8);



function dialogMessage(message) {
    let dialog = document.getElementById('dialogBox');
    let dialogMessage = document.getElementById('dialogBoxmMessage');
    dialogMessage.innerHTML = message;
    dialog.showModal();
}

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

document.getElementById('btn-signup').addEventListener('click', function (event) {
    let emailInput = document.getElementById('signup_email').value;
    if (!validateEmail(emailInput)) {
        dialogMessage("Invalid email, please try again.")
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    if (!validateName(document.getElementById('singup_first_name').value)) {
        dialogMessage("Invalid name, please try again.")
        event.preventDefault();
        event.stopPropagation();
        return false;
    }
    let form = document.getElementById('user_form');
    const $firstName = document.getElementById('singup_first_name');
    const $email = document.getElementById('signup_email');
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
});

document.getElementById('closeBtn').addEventListener('click', function (event) {
    let dialog = document.getElementById('dialogBox');
    dialog.close();
});